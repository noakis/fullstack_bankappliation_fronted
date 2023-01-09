import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import Loader from "../components/General/Loader";
import queryClient from "../query-client";
import axios from "../api/axios";

const WithAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const { push } = useRouter();

    // read user from queryClient
    const { data: user, isLoading } = useQuery(
      "user",
      async () => {
        const { data } = await axios.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        return data.user;
      },
      {
        onError: (error) => {},
      }
    );

    // if there is no accessToken go to login
    if (!localStorage.getItem("accessToken")) {
      push("/login");
    }

    if (isLoading) return <Loader />;
    return <WrappedComponent {...props} user={user} />;
  };

  return AuthComponent;
};

export default WithAuth;
