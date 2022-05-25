import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ModifiedSession } from "../../types/session";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = (await getSession({ req: context.req }))?.user as ModifiedSession | undefined;
    console.log(user);

    if (!user?.id) {
        return {
            redirect: {
                destination: "/api/auth/signin/guilded?callbackUrl=%2Fbios%2Fcreate",
                permanent: false,
            },
        };
    }

    return {
        redirect: {
            destination: `/u/${user.id}`,
            permanent: false,
        },
    };
};

const CreateRoute = () => {};
export default CreateRoute;
