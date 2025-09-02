import { FaEnvelope, FaMapPin, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Contact</h1>
        <p className="text-gray-600 text-center mb-4">
          We apperciate our user's feedback. Please fill out the form below or
          contact us directly
        </p>
        <form>
          <div className="space-y-4">
            {/** Name Input */}
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 py-2 focus:outline-none focus:ring-2 focus: ring-blue-400"
            />

            {/** Email Input */}
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full border border-gray-300 py-2 focus:outline-none focus:ring-2 focus: ring-blue-400"
            />

            {/** Message Input */}
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows={4}
              required
              className="mt-1 block w-full border border-gray-300 py-2 focus:outline-none focus:ring-2 focus: ring-blue-400"
            />
          </div>
          <button className="w-full bg-amber-400 py-2 mt-5 hover:bg-amber-600 transition duration-300">
            Send Message
          </button>
        </form>

        {/** Contact Information includes phone number, email & address*/}
        <div className="mt-8 text-center">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <div className="flex flex-col items-center space-y-2 mt-4">
            <div className="flex item-center">
              <FaPhone className="mr-2" />
              <span className="text-gray-600">+(1) 212-234-1234</span>
            </div>

            <div className="flex items-center">
              <FaEnvelope className=" mr-2" />
              <span className="text-gray-600">sellcart@gmail.com</span>
            </div>

            <div className="flex items-center">
              <FaMapPin className=" mr-2" />
              <span className="text-gray-600">188 N New Road St, 12345</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
