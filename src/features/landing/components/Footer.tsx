export function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Job Backpack. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
