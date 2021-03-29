using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SampleStreamPolling.Common
{
    public class StreamAPIHttpclient : IAPIHttpClient
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<StreamAPIHttpclient> _logger;
        private string apiURL;

        public StreamAPIHttpclient(ILogger<StreamAPIHttpclient> logger)
        {
            this._logger = logger;
            this._httpClient = new HttpClient();
        }

        public Task<StreamData> GetStreamAsync(string brToken, string apiURL, int? timeOutInMinute = null)
        {
            return GetInternalAsync(HttpMethod.Get, brToken, apiURL, timeOutInMinute);
        }

        public string PrepareUrl(string _apiUrl, NameValueCollection _params)
        {
            if (_params != null)
            {
                //throw new NotImplementedException();
            }
            else
                apiURL = _apiUrl;
            return apiURL;
        }

        public string WriteLog(string message)
        {
            throw new NotImplementedException();
        }

        private async Task<StreamData> GetInternalAsync(HttpMethod method, string brToken, string apiURL, int? timeOutInMinute = null)
        {
            const string url = "https://api.twitter.com/2/tweets/sample/stream";

            StreamData limitedJson = null;

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", ValidateToken(brToken));
            HttpResponseMessage response = await _httpClient.GetAsync(url, HttpCompletionOption.ResponseHeadersRead).ConfigureAwait(false);
            Stream streamToReadFrom = await response.Content.ReadAsStreamAsync();

            var bytes = new byte[2084];
            var bytesread = streamToReadFrom.Read(bytes, 0, 2084);
            streamToReadFrom.Close();
            limitedJson = Utility.ParseCmplexJSON(Encoding.UTF8.GetString(bytes).ToString());

            return limitedJson;
        }

        private static string ValidateToken(string brToken)
        {
            if (!string.IsNullOrEmpty(brToken))
                return brToken;
            else
                return string.Empty;
        }
    }
}
