swal("Numéro du device de torse", {
    content: {
      element: "input",
      attributes: {
        placeholder: "1, 2, 3 ...",
      },
    },
  }).then (() => {

    

    swal("Numéro du device de cuisses", {
        content: {
            element: "input",
            attributes: {
            placeholder: "1, 2, 3 ...",
            },
        },
        }).then (() => {

    

            if (toggle_3capteurs.checked) {

                swal("Numéro du device de tibias", {
                    content: {
                        element: "input",
                        attributes: {
                        placeholder: "1, 2, 3 ...",
                        },
                    },
                    });
            }
          }).then (() => {

            swal("Good job!", "You clicked the button!", "success");
          });;
  })