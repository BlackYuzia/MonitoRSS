import { InferType, object } from "yup";
import fetchRest from "../../../utils/fetchRest";
import { UserMeSchema } from "../types";

export interface UpdateUserMeInput {
  details: {
    preferences?: {
      alertOnDisabledFeeds?: boolean;
      dateFormat?: string;
      dateTimezone?: string;
      dateLocale?: string;
    };
  };
}

const UpdateUserMeOutputSchema = object({
  result: UserMeSchema,
});

export type UpdateUserMeOutput = InferType<typeof UpdateUserMeOutputSchema>;

export const updateUserMe = async ({ details }: UpdateUserMeInput): Promise<UpdateUserMeOutput> => {
  const res = await fetchRest("/api/v1/users/@me", {
    requestOptions: {
      method: "PATCH",
      body: JSON.stringify(details),
    },
    validateSchema: UpdateUserMeOutputSchema,
  });

  return res as UpdateUserMeOutput;
};
