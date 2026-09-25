import { PagePlaceholder } from '~/components/shared/PagePlaceholder';
import { metaFor } from '~/meta';
import { pageFor } from '~/site-map';

const page = pageFor('/technology')!;

export const meta = () => metaFor(page.path);

export default function Page() {
  return <PagePlaceholder page={page} />;
}
