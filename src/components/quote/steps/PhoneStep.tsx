interface Props {
  data: any;
  update: (v: any) => void;
  onSubmit: () => void;
  back?: () => void;
}

export default function PhoneStep({ data, update, onSubmit, back }: Props) {
  const valid = /^[0-9]{10}$/.test(data.phone);
  const formatPhone = (value: string) => {
    if (value.length <= 3) return value;
    if (value.length <= 6) return `(${value.slice(0, 3)}) ${value.slice(3)}`;
    return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Almost Done!
        </h2>
        <p className="text-gray-600">
          Enter your phone number to receive your custom quote
        </p>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              Your Quote Summary
            </h3>
            <div className="space-y-2 text-sm">
              {data.product && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Product selected</span>
                </div>
              )}
              {data.design && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Design chosen</span>
                </div>
              )}
              {data.material && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Material specified</span>
                </div>
              )}
              {data.image && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Reference image uploaded</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block font-semibold text-gray-900">
            Phone Number
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <input
              type="tel"
              value={data.phone ? formatPhone(data.phone) : ""}
              maxLength={14}
              onChange={(e) =>
                update({ phone: e.target.value.replace(/\D/g, "") })
              }
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 transition-all ${
                data.phone && !valid
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-amber-500 focus:border-amber-500"
              }`}
              placeholder="(555) 123-4567"
            />
          </div>
          {data.phone && !valid && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Please enter a valid 10-digit phone number
            </p>
          )}
          {valid && (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Valid phone number
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Privacy Notice:</strong> We'll use your phone number only to send you the quote and follow up. We never share your information with third parties.
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t">
        {back && (
          <button
            onClick={back}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
        )}

        <button
          disabled={!valid}
          onClick={onSubmit}
          className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-lg rounded-lg font-bold hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
        >
          <span className="flex items-center justify-center gap-2">
            Get My Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}