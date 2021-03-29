using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SampleStreamPolling.Common;
using System.Net.Http;
using Newtonsoft.Json;
using System.IO;
using System.Text;

namespace SampleStreamPolling.Controllers
{

    [Route("api/[controller]")]
    public class SampleController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IAPIHttpClient _iAPIHttpClient;

        public SampleController(IConfiguration config, IAPIHttpClient iAPIHttpClient)
        {
            _config = config;
            _iAPIHttpClient = iAPIHttpClient;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetSampleStream()
        {
            var tokenn = _config.GetValue<string>("SampleStreamAPISettings:Token");
            int timeoutinMinute = _config.GetValue<int>("SampleStreamAPISettings:Timeout");
            string apiUrl = _iAPIHttpClient.PrepareUrl(_config.GetValue<string>("SampleStreamAPISettings:ApiUrl"), null);
            var data = await _iAPIHttpClient.GetStreamAsync(tokenn, apiUrl, timeoutinMinute);
            var content = Newtonsoft.Json.JsonConvert.SerializeObject(data);
            return Ok(content);
        }
    }
}
