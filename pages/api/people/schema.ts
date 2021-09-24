import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { isKnownType, RawField } from '../../../lib/fields';

export default withApiAuthRequired(async function schema(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/people/schema`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  let peopleSchema = await response.json();

  if (!peopleSchema.attributes) {
    peopleSchema = { attributes: [] };
  }

  // const filteredOutColumns = ['created_at', 'updated_at', 'archived', 'ext_id', 'ext_system_id'];
  const filteredOutColumns: string[] = [];

  const filteredpeopleSchema = peopleSchema.attributes
    .filter((a: RawField) => !filteredOutColumns.includes(a.name))
    .filter((f: RawField) => isKnownType(f));
  res.status(200).json(filteredpeopleSchema);
});
