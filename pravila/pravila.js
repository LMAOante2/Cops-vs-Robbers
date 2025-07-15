    document.addEventListener("DOMContentLoaded", function () {

        fetch('https://raw.githubusercontent.com/LMAOante2/Cops-vs-Robbers/main/pravila/pravila.json')
            .then(response => response.json())
            .then(data => {
                const rulesContainer = document.getElementById('rules-container');
                data.rules.forEach(ruleCategory => {
                    const categoryDiv = document.createElement('div');
                    categoryDiv.classList.add('rule');
                    
                    const categoryTitle = document.createElement('h2');
                    categoryTitle.textContent = ruleCategory.category;
                    categoryDiv.appendChild(categoryTitle);
                    
                    const ruleList = document.createElement('ul');
                    ruleCategory.items.forEach(item => {
                        const listItem = document.createElement('li');
                        listItem.textContent = item;
                        ruleList.appendChild(listItem);
                    });

                    categoryDiv.appendChild(ruleList);
                    rulesContainer.appendChild(categoryDiv);
                });
            })
            .catch(error => console.error('Error:', error));
    });
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

    //3D modeli

    function setupScene(canvasId, modelPath, rotationAxis, rotationSpeed, positionVector) {
        const canvas = document.getElementById(canvasId);
        const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
        engine.loadingScreen.displayLoadingUI = () => {};
      
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
      
        const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2.2, 9.5, BABYLON.Vector3.Zero(), scene);
        camera.detachControl();
      
        const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
        light1.intensity = 1.0;
      
        const light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(-10, 5, -5), scene);
        light2.intensity = 0.6;
      
        const modelParent = new BABYLON.TransformNode("modelParent", scene);
      
        BABYLON.SceneLoader.Append("", modelPath, scene, () => {
          scene.meshes.forEach(mesh => {
            if (mesh !== modelParent && !mesh.parent) {
              mesh.parent = modelParent;
            }
          });
          modelParent.position = positionVector;
        });
      
        scene.onBeforeRenderObservable.add(() => {
          modelParent.rotation[rotationAxis] += rotationSpeed;
        });
      
        engine.runRenderLoop(() => {
          scene.render();
        });
      
        window.addEventListener("resize", () => {
          engine.resize();
        });
      
        return { camera, engine, canvas };
      }
      
      // Usage example:
      const scene1 = setupScene("Policajac", "/3D/police.glb", "y", 0.008, new BABYLON.Vector3(0, 0, 0));
      const scene2 = setupScene("Pljackas", "/3D/robber_tie.glb", "y", 0.008, new BABYLON.Vector3(0, 0, 0));
      
      // Now you can change sizes individually like this:
      scene1.canvas.style.width = "800px";
      scene1.canvas.style.height = "700px";
      scene1.engine.resize();
      
      scene2.canvas.style.width = "2000px";
      scene2.canvas.style.height = "2000px";
      scene2.engine.resize();
      
      // Also change cameras independently if needed:
      scene1.camera.alpha = Math.PI / 3;
      scene2.camera.beta = Math.PI / 2.5;

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
      
      
      
      
      