import highQualitySVG from "@/assets/images/high-quality.svg";
import highSpeedSVG from "@/assets/images/high-speed.svg";
import highSafetySVG from "@/assets/images/high-safety.svg";

const reasons = [
  {
    title: "High Quality",
    subtitle: "Premium Craftsmanship",
    content:
      "We believe your pets deserve the best. That's why we use durable, pet-friendly materials and meticulous craftsmanship to ensure every product meets the highest standards of comfort and longevity.",
    img: highQualitySVG,
  },
  {
    title: "High Speed",
    subtitle: "Fast & Reliable Delivery",
    content:
      "No more waiting! We ensure quick processing and speedy delivery so your pet can enjoy their new accessories as soon as possible. With our efficient logistics, your order arrives safely and on time.",
    img: highSpeedSVG,
  },
  {
    title: "High Safety",
    subtitle: "Pet-Approved & Secure",
    content:
      "Your pet's well-being is our priority. Our accessories are designed with non-toxic, hypoallergenic, and vet-approved materials, ensuring safety and peace of mind for every pet owner.",
    img: highSafetySVG,
  },
];

const WhyUs = () => {
  return (
    <section className="why-us">
      <h2 className="text-center mb-5">Why Petting Pick</h2>
      <div className="content d-flex justify-content-between mx-auto">
        {reasons.map(({ img, title, content }, i) => (
          <div
            className="reason d-flex flex-column align-items-center gap-4"
            key={`reason-${i}`}
          >
            <i
              className="icon bg-primary"
              style={{
                maskImage: `url("${img}")`,
              }}
            />
            <h5 className="text-primary">{title}&nbsp;</h5>
            <p className="text-primary">{content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
