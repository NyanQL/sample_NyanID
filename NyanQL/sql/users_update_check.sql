select * from users
         where
              (
                email = /*email*/"test@email@example.com"
                OR username = /*username*/"testuser"
            )
        AND id != /*id*/1;


