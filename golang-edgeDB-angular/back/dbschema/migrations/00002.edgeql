CREATE MIGRATION m1kfcchu5bljjxjbe6peolprlvhzfyxttqxms3gcbf43bxb4xy5n6q
    ONTO m1qt5k4qzatojb7kibirqav4elef5nbukiilsgpszdi2jleqrf2onq
{
  ALTER TYPE default::Todo {
      ALTER PROPERTY label {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::min_len_value(1);
      };
  };
};
