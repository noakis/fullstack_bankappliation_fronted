import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  ButtonBase,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "../../api/axios";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import NaviagtionHeader from "../../components/General/NavigationHeader";
import { MainCard } from "../../theme/components";

const Profile = () => {
  const { push } = useRouter();
  const { data: user } = useQuery("user", async () => {
    const { data } = await axios.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data?.user;
  });

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <NaviagtionHeader link={"/"} title={"Dashboard"} />

      <MainCard
        sx={{
          maxWidth: "40rem",
          mt: "1rem",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: ".5rem",
            }}
          >
            <Avatar
              sx={{
                width: "4rem",
                height: "4rem",
                bgcolor: "secondary.main",
              }}
            >
              {user?.firstName.slice(0, 1)}
            </Avatar>
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", ml: ".5rem" }}
            >
              {user?.firstName} {user?.lastName}
            </Typography>
          </Box>
          <ButtonBase
            sx={{ mt: "1rem", color: "text.secondary" }}
            onClick={() => push("/edit-profile")}
          >
            <Edit />
          </ButtonBase>
        </Box>
        <Table
          size="medium"
          sx={{
            mt: "2rem",
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  maxWidth: "10rem",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  width: "100%",
                }}
              >
                {user?.email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                }}
              >
                Role
              </TableCell>
              <TableCell>{user?.role}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                }}
              >
                Address
              </TableCell>
              <TableCell>{user?.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
              <TableCell>{user?.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                }}
              >
                State
              </TableCell>
              <TableCell>{user?.state}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                }}
              >
                Zip
              </TableCell>
              <TableCell>{user?.zipCode}</TableCell>
            </TableRow>
            <TableRow
              sx={{
                borderBottom: "none",
              }}
            >
              <TableCell
                sx={{
                  fontWeight: "bold",
                }}
              >
                Country
              </TableCell>
              <TableCell>{user?.country}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </MainCard>
    </Box>
  );
};

export default Profile;
