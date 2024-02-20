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

const client = mqtt.connect("ws://broker.esmqx.io:8083/mqtt", {
  clean: true,
  connectTimeout: 4000,
  clientId: 'emqx_test',
  username: 'emqx_test',
  password: 'emqx_test',
});

client.on('error', function (error) {
  console.log("error")
})