import * as React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { LoginComponent } from "../generated/apolloComponents";

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>

      <LoginComponent>
        {mutate => (
          <button
            onClick={async () => {
              const response = await mutate({
                variables: { email: "jane@gmail.com", password: "password" }
              });
              console.log(response);
              if (response && response.data) {
                document.cookie = `token=${response.data.login.token}`;
              }
            }}
          >
            Call login mutation
          </button>
        )}
      </LoginComponent>
    </Layout>
  );
};

export default IndexPage;
