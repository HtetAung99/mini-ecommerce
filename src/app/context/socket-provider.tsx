// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";

// type SocketContextType = {
//   socket: any | null;
//   isConnected: boolean;
// };

// const SocketContext = createContext<SocketContextType>({
//   socket: null,
//   isConnected: false,
// });

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
//   const [socket, setSocket] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     const socket = new (io as any)("http://localhost:4000");

//     setSocket(socket);

//     socket.on("connect", () => {
//       console.log("connected");
//       setIsConnected(true);
//     });

//     socket.on("disconnect", () => {
//       setIsConnected(false);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket, isConnected }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
