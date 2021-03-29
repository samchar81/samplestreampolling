using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Specialized;

namespace SampleStreamPolling.Common
{
    public interface IAPIHttpClient
    {
        string PrepareUrl(string _apiUrl, NameValueCollection _params);
        Task<StreamData> GetStreamAsync(string brToken, string apiURL, int? timeOutInMinute = null);
        string WriteLog(string message);
    }
}
