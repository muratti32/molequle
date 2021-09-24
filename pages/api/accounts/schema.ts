import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { isKnownType, RawField } from '../../../lib/fields';

export default withApiAuthRequired(async function schema(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/accounts/schema`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  let accountsSchema = await response.json();

  if (!accountsSchema.attributes) {
    accountsSchema = { attributes: [] };
  }

  console.log(accountsSchema);

  // const filteredOutColumns = ['created_at', 'updated_at', 'archived'];
  const filteredOutColumns: string[] = [];

  const filteredAccountsSchema = accountsSchema.attributes
    .filter((a: RawField) => !filteredOutColumns.includes(a.name))
    .filter((f: RawField) => isKnownType(f));

  res.status(200).json(filteredAccountsSchema);
});
