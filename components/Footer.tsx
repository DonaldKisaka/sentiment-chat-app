
const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
                <p className="text-sm text-gray-500 text-center w-full flex justify-center items-center">
                    &copy; {new Date().getFullYear()} ChatSphere. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
