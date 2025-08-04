import LogoNS from '../../../app/assets/imgs/LOGO_NS_SINFONDO.png';

export const LocalLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-yellow-50 to-amber-100 flex items-center justify-center p-6">
      <div className="relative text-center mb-8">
         <div className="w-24 h-24 rounded-2xl animate-bounce mx-auto relative">
            <div className="absolute rounded-full bg-white"></div>
            <img src={LogoNS} alt="LOGO NS" />
          </div>

          <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-yellow-400 animate-bounce delay-100"></div>
          <div className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-teal-400 animate-bounce delay-300"></div>
          <div className="absolute top-1/2 -right-4 w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-500"></div>

          <div className='space-y-4'>
            <h1 className="text-4xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-yellow-600 to-amber-700 animate-pulse">
              Cargando...
            </h1>
          </div>
      </div>
    </div>
  )
}
