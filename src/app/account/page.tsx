import { getUser } from "@workos-inc/authkit-nextjs";
import { Text, Heading, TextField, Flex, Box } from "@radix-ui/themes";
import { UserFields } from "./user-fields";
import { ConvexClientProvider } from "../convex-client-provider";

export default async function AccountPage() {
  const { user, role, permissions } = await getUser({ ensureSignedIn: true });

  const sessionFields = [
    role ? ["Role", role] : [],
    permissions ? ["Permissions", permissions] : [],
    ["Id", user.id],
  ].filter((arr) => arr.length > 0);

  return (
    <>
      <Flex direction="column" gap="2" mb="7">
        <Heading size="8" align="center">
          Account details
        </Heading>
        <Text size="5" align="center" color="gray">
          Below are your account details
        </Text>
      </Flex>

      <Flex direction="column" justify="center" gap="3" width="400px">
        <ConvexClientProvider>
          <UserFields />
        </ConvexClientProvider>

        {sessionFields && (
          <>
            {sessionFields.map(([label, value]) => (
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
          </>
        )}
      </Flex>
    </>
  );
}
