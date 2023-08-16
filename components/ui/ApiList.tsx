'use client';

import useOrigin from '@/hooks/useOrigin';
import { useParams } from 'next/navigation';
import APIAlert from './APIAlert';

interface Props {
  entityName: string;
  entityIdName: string;
}

const ApiList: React.FC<Props> = ({ entityName, entityIdName }) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin as string}/api/${params.storeId as string}`;
  return (
    <>
      <APIAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`} />
      <APIAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <APIAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`} />
      <APIAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <APIAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};

export default ApiList;
