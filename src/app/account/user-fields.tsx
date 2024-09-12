"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Text, TextField, Flex, Box } from "@radix-ui/themes";

export function UserFields({ userId }: { userId: string }) {
  const user = useQuery(api.user.get, { userId });
  console.log(userId);

  if (!user) return null;

  const userFields = [
    ["First name", user.first_name],
    ["Last name", user.last_name],
    ["Email", user.email],
  ];

  return (
    <Flex direction="column" justify="center" gap="3" width="400px">
      {userFields.map(([label, value]) => (
        <Flex asChild align="center" gap="6" key={value}>
          <label>
            <Text weight="bold" size="3" style={{ width: 100 }}>
              {label}
            </Text>

            <Box flexGrow="1">
              <TextField.Root value={value || ""} readOnly />
            </Box>
          </label>
        </Flex>
      ))}
    </Flex>
  );
}
