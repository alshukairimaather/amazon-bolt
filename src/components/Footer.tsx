export default function Footer() {
  const cols = [
    {
      title: 'Get to Know Us',
      links: ['Careers', 'Blog', 'About Amazon', 'Investor Relations', 'Amazon Devices', 'Amazon Science'],
    },
    {
      title: 'Make Money with Us',
      links: [
        'Sell products on Amazon', 'Sell on Amazon Business', 'Sell apps on Amazon',
        'Become an Affiliate', 'Advertise Your Products', 'Self-Publish with Us',
        'Host an Amazon Hub',
      ],
    },
    {
      title: 'Amazon Payment Products',
      links: ['Amazon Business Card', 'Shop with Points', 'Reload Your Balance', 'Amazon Currency Converter'],
    },
    {
      title: 'Let Us Help You',
      links: [
        'Amazon and COVID-19', 'Your Account', 'Your Orders', 'Shipping Rates & Policies',
        'Returns & Replacements', 'Manage Your Content and Devices', 'Help',
      ],
    },
  ];

  return (
    <footer>
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-[#37475a] hover:bg-[#485769] text-white text-[13px] py-3.5 flex items-center justify-center transition-colors"
      >
        Back to top
      </button>

      {/* Link columns */}
      <div className="bg-[#232f3e] text-white py-10 px-4">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {cols.map(col => (
            <div key={col.title}>
              <p className="font-bold text-[14px] mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-[#ddd] text-[13px] hover:text-white hover:underline transition-colors leading-snug block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Logo divider */}
      <div className="bg-[#232f3e] border-t border-[#3a4553] py-6 flex justify-center">
        <a href="#" className="flex items-center">
          <span className="text-white font-bold text-[22px] tracking-tight" style={{ fontFamily: '"Amazon Ember", Arial, sans-serif' }}>
            amazon
          </span>
          <span className="text-[#ff9900] text-[10px] font-bold ml-0.5 self-end mb-1">.com</span>
        </a>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#131a22] text-[#ddd] text-[11px] text-center py-5 space-y-2.5">
        <div className="flex items-center justify-center gap-4 flex-wrap px-4">
          {['Conditions of Use', 'Privacy Notice', 'Consumer Health Data Privacy Disclosure', 'Your Ads Privacy Choices'].map(item => (
            <a key={item} href="#" className="hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>
        <p>© 1996-2026, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
}
