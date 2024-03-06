import prisma from "./prisma";
import { getCurrentUser } from "./session";
import {
  GroupWithNestedData,
  PermissionRoleWithNestedData,
  SubSessionUser,
} from "@/app/types";

export const getExtendedPrisma = async () => {
  const sessionUser = await getCurrentUser();

  if (!sessionUser) {
    throw new Error("No user found");
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      id: true,
      name: true,
      groups: {
        include: {
          permissions: {
            include: {
              entity: true,
            },
          },
        },
      },
      permissionRoles: {
        include: {
          permissions: {
            include: { entity: true },
          },
        },
      },
      role: true,
      storeAccesses: true,
    },
  });

  if (!currentUser) {
    throw new Error("No user found");
  }

  if (currentUser.role === "SUPERADMIN") {
    return prisma;
  }

  const permissions: any = extractPermissions(currentUser);

  return prisma.$extends({
    name: "permission",
    query: {
      $allModels: {
        $allOperations({ model, operation, args, query }) {
          /* your custom logic for modifying all operations on all models here */
          if (!Object.keys(permissions).includes(model)) {
            throw new Error(
              `You don't have permission to perform this operation`,
            );
          }
          Object.entries(METHODS).forEach(
            ([key, value]: [string, string[]]) => {
              if (value.includes(operation)) {
                if (!permissions[model].includes(key)) {
                  throw new Error(
                    `No access to this operation: ${operation} on table: ${model}`,
                  );
                }
              }
            },
          );
          return query(args);
        },
      },
    },
  });
};

const METHODS = {
  CREATE: ["create", "createMany", "upsert"],
  READ: ["findUnique", "findFirst", "findMany", "aggregate"],
  UPDATE: ["update", "updateMany"],
  DELETE: ["delete", "deleteMany"],
};

export const extractPermissions = (currentUser: SubSessionUser) => {
  let result = {};

  result = getPermissionSet(currentUser.permissionRoles, result);
  result = getPermissionSet(currentUser.groups, result);

  return result;
};

const getPermissionSet = (
  target: PermissionRoleWithNestedData[] | GroupWithNestedData[],
  result: {},
) => {
  target.forEach((role) => {
    const inside = role.permissions?.reduce((prev: any, permission) => {
      if (prev[permission.entity.name] == null) {
        return {
          ...prev,
          [permission.entity.name]: [...permission.action],
        };
      }
      return {
        ...prev,
        [permission.entity.name]: [
          ...prev[permission.entity.name],
          ...permission.action,
        ],
      };
    }, {});

    result = {
      ...result,
      ...inside,
    };
  });

  return result;
};
