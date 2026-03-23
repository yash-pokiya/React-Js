import { Focus, Search ,CircleCheck} from "lucide-react";

const HeroSection = () => {
  return (
    <>
      <section className="flex items-end justify-center w-full ">
        {/* </Introduction> */}
        <div className="w-1/2 overflow-hidden px-6">
          <h1 className="text-4xl font-bold">Unsplash</h1>
          <p className="my-2 text-[18px] font-normal">
            The internet&apos;s source for visuals.
            <br />
            Powered by creators everywgher.
          </p>
          {/* Searchbar */}
          <div className="bg-gray-200 px-4 py-3 flex items-center justify-between gap-x-2 rounded-full">
            <Search className="w-5 h-5 text-gray-600" strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Search photos and illustrations"
              className="w-full focus:outline-none"
            />
            <Focus className="w-5 h-5 text-gray-600" strokeWidth={2.5} />
          </div>
        </div>

        {/* card */}
        <div className="w-1/2 border flex justify-evenly items-center max-w-xl border-gray-200 rounded-lg px-4 py-6 ">
          {/* text and button */}
          <div className="w-1/2 flex  justify-end items-start gap-y-25 flex-col  ">
            {/* text */}
            <div>
              {/* svg icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                version="1.1"
                aria-hidden="false"
                className="flex-0"
              >
                <desc lang="en-US">Plus sign for Unsplash+</desc>
                <path d="M11.281 8.3H8.156V3.125L11.281 1v7.3Zm.316 4.05H4.955V7.868L1.5 10.636v4.55h6.656V22h4.713l3.552-2.84h-4.824v-6.81Zm4.24 0v2.835h4.587l2.911-2.834h-7.497Z"></path>
              </svg>
              <p className="text-[15px] font-semibold leading-normal my-2">
                Create confidently with
                <br />
                enhance legal protection.
              </p>
              <p className="text-[15px] font-normal leading-normal my-2 text-[#767676]">
                Premium downloads
                <br />
                backed by full coverage.
              </p>
              {/* text */}
            </div>
            <button className="text-[14px] font-medium text-white bg-black py-1 px-3 rounded-lg">
              Get Unsplash
            </button>
          </div>
          {/* image and chip */}
          <div className="relative w-1/2">
            <img
              className="-rotate-6"
              src="https://unsplash-assets.imgix.net/modules/legal-protections/photo-1.jpg?w=192&dpr=1&h=257&auto=format&fit=crop&q=60 1x, https://unsplash-assets.imgix.net/modules/legal-protections/photo-1.jpg?w=192&dpr=2&h=257&auto=format&fit=crop&q=60 2x"
              alt="img-1"
            />
            <img
              src="https://unsplash-assets.imgix.net/modules/legal-protections/photo-2.jpg?w=192&dpr=1&h=257&auto=format&fit=crop&q=60 1x, https://unsplash-assets.imgix.net/modules/legal-protections/photo-2.jpg?w=192&dpr=2&h=257&auto=format&fit=crop&q=60 2x
"
              alt="img-2"
              className="absolute top-0 rotate-10 left-6"
            />
            {/* chip 1 */}
            <div className="flex items-center justify-center gap-x-1 absolute z-10 top-32 left-20 text-[12px] rounded-full border border-gray-200 px-2 py-1 bg-white font-semibold ">
                <CircleCheck fill="green" className="text-white w-5 h-5" />
                Worry-free Licensing
            </div>
            {/* chip 2 */}
            <div className="flex items-center justify-center gap-x-1 font-semibold absolute z-10 text-[12px] bg-white border border-gray-200 px-2 py-1 rounded-full top-44 left-6">
                <CircleCheck fill="green" className="text-white w-5 h-5" />
                Cleared for all uses
            </div>
    {/* signature  */}
      <div className="w-42 absolute -bottom-6 right-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 167 58"
                  className="signature-znvmDX"
                >
                  <g filter="url(#a)">
                    <path fill="#fff" d="M4 16h147v34H4z"></path>
                    <path
                      fill="#767676"
                      d="M24 34q2.3-1.5 3.5-3.2a6 6 0 0 0 1.3-3.5 3 3 0 0 0-.4-1.7q-.5-.6-1.2-.6-1.4 0-2.4 2a11 11 0 0 0-.7 7m-9 3h-.6l-.2-.4q0-.3.2-.4l1.2-1.2-1.3-1.3-.1-.3.2-.4h.6l1.3 1.3 1.3-1.3h.6l.2.4q0 .2-.2.3L17 35l1.2 1.3.2.3q0 .2-.2.3l-.3.2q-.2 0-.3-.2l-1.3-1.2zm10.8 0q-.8 0-1.3-.4-.6-.3-1-1l-2.4 1-.3-.3V36l.3-.2 2-1-.2-1.3V32q0-3.4 1.2-5.7 1.3-2.2 3.1-2.2 1.2 0 1.9 1 .7.8.7 2.3a7 7 0 0 1-1.5 4.1q-1.4 2-4 3.5l.6.8.8.2q.7 0 1.6-.6.8-.7 1.5-1.8l.3-.2h.4l.3.3V35q0 .6.4 1l.4-.4q.3 0 .6-.4l.3-.2.4.1.2.4q0 .2-.2.3-.5.6-1 .8l-.9.3q-.4 0-.7-.5l-.5-1.3q-.6.9-1.4 1.3-1 .5-1.7.5m-10 4q-.4 0-.6-.2l-.2-.5.2-.6.5-.2.5.2.2.6q0 .3-.2.5zm3.5 0-.5-.2-.2-.5.2-.6.5-.2.6.2.2.6q0 .3-.2.5zm3.7 0q-.3 0-.5-.2l-.3-.5.3-.6.5-.2.5.2.2.6q0 .3-.2.5zm3.6 0q-.3 0-.5-.2l-.2-.5.2-.6.5-.2a1 1 0 0 1 .7.8 1 1 0 0 1-.7.7m3.7 0q-.4 0-.6-.2l-.2-.5.2-.6.5-.2.6.2.2.6q0 .3-.2.5z"
                    ></path>
                    <path
                      stroke="#767676"
                      strokeWidth=".5"
                      d="M23 41q-.3 0-.5-.2l-.3-.5.3-.6.5-.2.5.2.2.6q0 .3-.2.5l-.5.2m1-7q2.3-1.5 3.5-3.2a6 6 0 0 0 1.3-3.5 3 3 0 0 0-.4-1.7q-.5-.6-1.2-.6-1.4 0-2.4 2a11 11 0 0 0-.7 7Zm-9 3h-.6l-.2-.4q0-.3.2-.4l1.2-1.2-1.3-1.3-.1-.3.2-.4h.6l1.3 1.3 1.3-1.3h.6l.2.4q0 .2-.2.3L17 35l1.2 1.3.2.3q0 .2-.2.3l-.3.2q-.2 0-.3-.2l-1.3-1.2zm10.8 0q-.8 0-1.3-.4-.6-.3-1-1l-2.4 1-.3-.3V36l.3-.2 2-1-.2-1.3V32q0-3.4 1.2-5.7 1.3-2.2 3.1-2.2 1.2 0 1.9 1 .7.8.7 2.3a7 7 0 0 1-1.5 4.1q-1.3 2-3.9 3.5l.6.8.8.2q.7 0 1.6-.6.8-.7 1.5-1.8l.3-.2h.4l.3.3V35q0 .6.4 1l.4-.4q.3 0 .6-.4l.3-.2.4.1.2.4q0 .2-.2.3-.5.6-1 .8l-.9.3q-.4 0-.7-.5l-.5-1.3q-.6.9-1.4 1.3-1 .5-1.7.5Zm-10 4q-.4 0-.6-.2l-.2-.5.2-.6.5-.2.5.2.2.6q0 .3-.2.5zm3.5 0-.5-.2-.2-.5.2-.6.5-.2.6.2.2.6q0 .3-.2.5zm7.3 0q-.3 0-.5-.2l-.2-.5.2-.6.5-.2a1 1 0 0 1 .7.8 1 1 0 0 1-.7.7Zm3.7 0q-.4 0-.6-.2l-.2-.5.2-.6.5-.2.6.2.2.6q0 .3-.2.5z"
                    ></path>
                  </g>
                  <path
                    className="signatureAnimation-mv7aFh"
                    stroke="#111"
                    strokeWidth="2"
                    d="M166 31.5c-4.1 3.2-24 11.5-37.7 2.9-9.6-6.1-12.3 2.6-23 3.2-6 .3-11.3.1-11.9-1.3q-.5-1-.1-2.3.3-.5.7-.4t.3.7q0 .4-.3 1t-1 1c-3 1.5-5.7 3.2-10 2.5-2.3-.3-4-2.9-5.3-2C65.4 46.3 57.4 36.5 66 23c2.3-3.6 9.8-14 8.2-9.9A68 68 0 0 1 61 29.6C46.7 39.8 47.6 10 54.5 2c4.8-5.7-1.4 15.2-4.8 21.8l-9.2 17.3"
                  ></path>
                  <defs>
                    <filter
                      id="a"
                      width="155"
                      height="46"
                      x="0"
                      y="12"
                      colorInterpolationFilters="sRGB"
                      filterUnits="userSpaceOnUse"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        result="hardAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      ></feColorMatrix>
                      <feOffset dy="4"></feOffset>
                      <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                      <feComposite in2="hardAlpha" operator="out"></feComposite>
                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"></feColorMatrix>
                      <feBlend
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2289_6252"
                      ></feBlend>
                      <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2289_6252"
                        result="shape"
                      ></feBlend>
                    </filter>
                  </defs>
                </svg>
              </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
