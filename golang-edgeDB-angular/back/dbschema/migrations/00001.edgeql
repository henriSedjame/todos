CREATE MIGRATION m1qt5k4qzatojb7kibirqav4elef5nbukiilsgpszdi2jleqrf2onq
    ONTO initial
{
  CREATE TYPE default::Todo {
      CREATE PROPERTY completed: std::bool {
          SET default := false;
      };
      CREATE REQUIRED PROPERTY label: std::str;
  };
};
