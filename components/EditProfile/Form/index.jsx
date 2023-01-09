import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "../../../api/axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FormBox } from "../../../theme/components";
import { editProfile } from "../../../api/user";
import { useRouter } from "next/router";

const EditProfileForm = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { data: user } = useQuery("user", async () => {
    const { data } = await axios.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data?.user;
  });
  const { mutateAsync: updateUser } = useMutation(
    async (data) => {
      await editProfile(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userr");
        // after 2 seconds, push to profile page
        setTimeout(() => {
          push("/profile");
        }, 2000);
      },
    }
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
      city: user?.city,
      state: user?.state,
      zipCode: user?.zipCode,
    },
  });

  const onSubmit = (data) => {
    updateUser(data);
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "grid",
          gap: "1rem",
        }}
      >
        <Typography variant="h6">Edit Profile</Typography>

        <FormBox>
          <InputLabel
            htmlFor="firstName"
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
              mb: "1rem",
            }}
          >
            First Name
          </InputLabel>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                label="First Name"
                variant="outlined"
                fullWidth
                error={errors.firstName}
                helperText={errors.firstName && "First Name is required"}
                required
              />
            )}
          />
        </FormBox>
        <FormBox>
          <InputLabel
            htmlFor="lastName"
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
              mb: "1rem",
            }}
          >
            Last Name
          </InputLabel>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                label="Last Name"
                variant="outlined"
                fullWidth
                error={errors.lastName}
                helperText={errors.lastName && "Last Name is required"}
                required
              />
            )}
          />
        </FormBox>
        <FormBox>
          <InputLabel
            htmlFor="email"
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
              mb: "1rem",
            }}
          >
            Email
          </InputLabel>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                error={errors.email}
                helperText={errors.email && "Email is required"}
                required
              />
            )}
          />
        </FormBox>
        <FormBox>
          <InputLabel
            htmlFor="phoneNumber"
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
              mb: "1rem",
            }}
          >
            Phone Number
          </InputLabel>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                label="Phone Number"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </FormBox>
        <FormBox>
          <InputLabel
            htmlFor="address"
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
              mb: "1rem",
            }}
          >
            Address
          </InputLabel>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                label="Address"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </FormBox>
        <FormBox>
          <InputLabel
            htmlFor="city"
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
              mb: "1rem",
            }}
          >
            City
          </InputLabel>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                label="City"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </FormBox>
        <FormBox>
          <InputLabel
            htmlFor="state"
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
              mb: "1rem",
            }}
          >
            State
          </InputLabel>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                label="State"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </FormBox>
        <FormBox>
          <InputLabel
            htmlFor="zipCode"
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
              mb: "1rem",
            }}
          >
            Zip Code
          </InputLabel>
          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                label="Zip Code"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </FormBox>
        <FormBox>
          <InputLabel
            htmlFor="country"
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
              mb: "1rem",
            }}
          >
            Country
          </InputLabel>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                {...field}
                label="Country"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </FormBox>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: "1rem" }}
          size="large"
        >
          Save
        </Button>
      </Box>
    </form>
  );
};

export default EditProfileForm;
