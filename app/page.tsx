import React, { NextPage } from "next";

import { Button } from "~/components/ui/button";

const Home: NextPage = (): JSX.Element => {
  return (
    <div>
      <Button variant="destructive">Hello</Button>
    </div>
  );
};

export default Home;
