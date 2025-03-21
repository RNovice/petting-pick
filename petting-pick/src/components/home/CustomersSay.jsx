const CustomersSay = () => {
  const testimonials = [
    {
      text: "Great quality and fast shipping! My dog loves the bed!",
      author: "Emily R.",
    },
    {
      text: "Best pet accessories store! Will definitely buy again.",
      author: "Mark T.",
    },
    {
      text: "Stylish and comfortable products for my cat!",
      author: "Sarah L.",
    },
  ];

  return (
    <section className="py-4">
      <div className="container text-center">
        <h2 className="mb-5">What Our Customers Say</h2>
        <div className="row">
          {testimonials.map(({ text, author }, index) => (
            <div key={`customers-say-${index}`} className="col-md-4">
              <div className="card p-3 shadow-sm">
                <p>&quot;{text}&quot;</p>
                <strong>- {author}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomersSay;
