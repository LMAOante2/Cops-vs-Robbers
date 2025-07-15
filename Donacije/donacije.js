document.addEventListener("DOMContentLoaded", function () {
        const menuToggle = document.querySelector(".menu-toggle");
        const closeMenu = document.querySelector(".close-menu");
        const sideMenu = document.querySelector(".side-menu");

        menuToggle.addEventListener("click", function () {
            sideMenu.classList.add("active");
        });

        closeMenu.addEventListener("click", function () {
            sideMenu.classList.remove("active");
        });

        document.addEventListener("click", function (event) {
            if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                sideMenu.classList.remove("active");
            }
        });
    });

          //Pokazivanje
          const buttons = document.querySelectorAll('.btn4');  
          const rules = document.querySelectorAll('.rule');
          const ddd = document.querySelectorAll('.ddd');
          const krug = document.querySelectorAll('.krug')
          const krug1 = document.querySelectorAll('.krug1')
          
          buttons.forEach(button => {
            button.addEventListener('click', () => {
              const targetId = button.dataset.target;

              
              rules.forEach(rule => rule.classList.remove('show'));
              ddd.forEach(el => el.classList.remove('show'));
              krug.forEach(el => el.classList.remove('show'));
              krug1.forEach(el => el.classList.remove('show'));
              krug.forEach(el => el.classList.remove('hide'));
              krug1.forEach(el => el.classList.remove('hide'));
              buttons.forEach(btn => btn.classList.remove('active'));

              const targetRule = document.getElementById(targetId);
              if (targetRule) {
                targetRule.classList.add('show');
              }
              button.classList.add('active');
          

              if (targetId === 'rule1') {
                document.getElementById('Policajac')?.classList.add('show');
                document.getElementById('test')?.classList.add('show');
                document.getElementById('test1')?.classList.add('show');
              } else if (targetId === 'rule2') {
                document.getElementById('Pljackas')?.classList.add('show');
                document.getElementById('test')?.classList.add('show');
                document.getElementById('test1')?.classList.add('show');
              }

              if (targetId === 'rule3') {
                document.getElementById('krug')?.classList.add('hide');
                document.getElementById('krug1')?.classList.add('hide');
              }
            });
          });