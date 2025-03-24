import {axiosInstance} from "../lib/axios.js"
import {create} from 'zustand'
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) =>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket:null,



    checkAuth: async ()=>{
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set({authUser : res.data});  

            get().connectSocket();

        } catch (error) {
            console.log("error while check auth" , error);
            set({authUser:false})
        }finally{
            set({isCheckingAuth:false});
        }
    },


    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        //   get().connectSocket();
        } catch (error) {
        console.log(error)
            // toast.error("Signup failed! Please try again later.");
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
        },

    logout: async () => {
    try {
        await axiosInstance.get("/auth/logout");
        set({authUser : null});
        toast.success("You have been logged out successfully.");

    
        get().disConnectSocket(); // Fixed function name

    } catch (error) {
        toast.error("Logout failed! Please try again.")
        
    }
    },

    login: async (data) => {
    set({ isLoggingIn: true });
    try {
        const res = await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data });

        toast.success("Logged in successfully");

        get().connectSocket();
 
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message || "Fail to Login ");
    } finally {
        set({ isLoggingIn: false });
    }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
        const res = await axiosInstance.put("/auth/update-profile", data);
        set({ authUser: res.data });
        toast.success("Profile updated successfully");
    } catch (error) {
        console.log("error in update profile:", error);
        toast.error(error.response.data.message);
    } finally {
        set({ isUpdatingProfile: false });
    }
    },

    connectSocket: () => {

        const { authUser } = get();
        if (!authUser || get().socket) return; 

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
                },
            });

        socket.connect();


    
        set({ socket: socket });
    
        socket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });
      },
      disConnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
      },
    

    
}))
