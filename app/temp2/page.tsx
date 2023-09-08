import React from 'react';

interface IAppProps {
  // you can define props here if needed
}

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Enter Loss Data</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-wrap -mx-2 overflow-hidden sm:-mx-1 md:-mx-2">
                  <div className="my-2 px-2 w-full overflow-hidden sm:my-1 sm:px-1 sm:w-7/10 md:my-1 md:px-1 md:w-7/10">
                    <div className="p-4 bg-blue-200">
                      70% width
                    </div>
                  </div>
                  <div className="my-2 px-2 w-full overflow-hidden sm:my-1 sm:px-1 sm:w-3/10 md:my-1 md:px-1 md:w-3/10">
                    <div className="p-4 bg-green-200">
                      30% width
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
