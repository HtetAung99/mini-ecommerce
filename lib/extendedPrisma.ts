import { Group, Permission, PermissionRole } from "@prisma/client";
import prisma from "./prisma";
import { getCurrentUser } from "./session";
import { GroupWithNestedData, PermissionRoleWithNestedData } from "@/app/types";

export const getExtendedPrisma = async () => {
  const permissions: any = await extractPermissions();
  return prisma.$extends({
    name: "permission",
    query: {
      $allModels: {
        $allOperations({ model, operation, args, query }) {
          /* your custom logic for modifying all operations on all models here */
          if (!Object.keys(permissions).includes(model)) {
            throw new Error(`No access to this table: ${model}`);
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

export const extractPermissions = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("No user found");
  }

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
