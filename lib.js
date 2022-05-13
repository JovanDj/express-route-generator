module.exports = (app, resources) => {
  app.get("/", (req, res) => {
    res.json(
      resources.map((resource) => {
        return { [resource.name]: `http://localhost:3000/${resource.name}` };
      })
    );
  });

  resources.forEach((resource) => {
    app.get(`/${resource.name}`, (req, res) => {
      res.json({ [resource.name]: resource.data.sort((a, b) => b.id - a.id) });
    });

    app.get(`/${resource.name}/:id`, (req, res) => {
      res.json({
        [resource.name]: resource.data.find(
          (record) => +record.id === +req.params.id
        ),
      });
    });

    app.post(`/${resource.name}`, (req, res) => {
      const id = resource.data.sort((a, b) => b.id - a.id)[0].id + 1;
      resource.data.push({
        id,
        ...req.body,
        url: `http://localhost:3000/${resource.name}/${id}`,
      });

      res.json({
        [resource.name]: resource.data.find((record) => record.id === id),
      });
    });

    app.delete(`/${resource.name}/:id`, (req, res) => {
      try {
        resource.data = [
          ...resource.data.filter((record) => +record.id !== +req.params.id),
        ];
        res.redirect(`/${resource.name}`);
      } catch (error) {
        throw error;
      }
    });
  });
};
