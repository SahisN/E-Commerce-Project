const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
        About Us
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-lg mb-4">
            At Sell Cart, we believe technology should be accessible,
            affordable, and sustainable. Our platform is built for people who
            want to buy and sell tech items with ease — whether it’s the latest
            smartphone, a powerful laptop, or custom parts for your next DIY
            project.
          </p>
        </div>

        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://embarkx.com/sample/placeholder.png"
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <div>
        <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
          Why Choose Sell Cart?
        </h1>
        <ul className="list-disc list-inside space-y-4 text-lg text-slate-700 max-w-2xl mx-auto">
          <li>
            Wide Range of Tech Products - From iPhones to DIY drone parts.
          </li>
          <li>Secure Transactions - Buyer and seller protections built-in.</li>
          <li>
            Eco-Friendly Impact - By giving tech a second life, we reduce
            e-waste and promote sustainability.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
