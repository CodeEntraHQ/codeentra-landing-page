import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

const ServiceCard = ({ title, description, icon, fullDescription }) => {
  const [isOpen, setIsOpen] = useState(false);
  const displayDescription = fullDescription || description;

  return (
    <>
      <Card className="group hover:shadow-lg transition-all border border-gray-200 hover:border-green-300 hover:-translate-y-1 duration-300 h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 text-green-800 group-hover:bg-green-200 group-hover:text-green-700 transition-all">
            {icon}
          </div>
          <CardTitle className="text-xl text-black">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <CardDescription className="text-base text-muted-foreground line-clamp-3 mb-4">
            {description}
          </CardDescription>
          <div className="mt-auto">
            <button
              onClick={() => setIsOpen(true)}
              className="text-green-800 font-medium flex items-center group-hover:text-green-500 transition-colors duration-300 cursor-pointer"
            >
              Learn more
              <svg
                className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white border-2 border-green-300/50 shadow-2xl max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="w-full h-1.5 bg-gradient-to-r from-green-500 via-green-400 to-green-500 mb-6 rounded-t-lg"></div>
          <DialogHeader className="px-6 pb-6 border-b border-gray-200">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl ring-4 ring-green-100 flex-shrink-0">
                <div className="text-white scale-110">
                  {icon}
                </div>
              </div>
              <div className="flex-1 pt-1">
                <DialogTitle className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                  {title}
                </DialogTitle>
                <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-300 rounded-full"></div>
              </div>
            </div>
          </DialogHeader>
          <div className="px-6 py-6">
            <DialogDescription className="text-gray-700 text-lg leading-relaxed">
              <p className="text-gray-800 font-medium">
                {displayDescription}
              </p>
            </DialogDescription>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-green-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-semibold">Ready to get started? Contact us today!</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceCard;
