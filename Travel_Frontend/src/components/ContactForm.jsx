import "./css/ContactFormStyles.css";

function ContactForm() {
    return (
        <div className="form-container">
            <h1 className="text-4xl font-bold text-[#00B4CC] mb-12 mt-8">Send A Message</h1>
            <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-2xl mb-4">
                <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#00B4CC]"    
                    type="text"
                    id="name"
                    placeholder="Your Name"
                />

                <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#00B4CC]"
                    type="email"
                    id="email"
                    placeholder="Your Email"
                />

                <input
                
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#00B4CC]"
                    type="text"
                    id="subject"
                    placeholder="Subject"
                />

                <textarea
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#00B4CC]"
                    id="description"
                    rows="4"
                    placeholder="Your Message"
                />

                <button
                    type="submit"
                    className="bg-[#00B4CC] text-white hover:text-white hover:bg-black rounded-lg mx-36 py-4"
                >
                    Send Message
                </button>
            </form>

            <div className="mt-8">
                <p className="text-lg font-semibold text-[#3A3A3A]">Follow us on Instagram:</p>
                <a href="https://www.instagram.com/" className="text-[#00B4CC] hover:underline">
                    @your_instagram_handle
                </a>
            </div>

            <div className="mt-4 mb-4">
                <p className="text-lg font-semibold text-[#3A3A3A]">Call us:</p>
                <a href="tel:+1234567890" className="text-[#00B4CC] hover:underline">
                    +123 456 7890
                </a>
            </div>
        </div>
    );
}

export default ContactForm;
