import React from 'react'

const Footer = () => {
  return (
        <footer className="w-full bg-gradient-to-b from-blue-950 to-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                    
                </div>
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                    Track smarter. Apply better. Get hired faster.
                </p>
            </div>
            <div className="border-t border-blue-950">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <a href="https://prebuiltui.com">JobTracker</a> ©2026. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer