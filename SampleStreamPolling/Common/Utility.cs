using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Converters;

namespace SampleStreamPolling.Common
{
    public static class Utility
    {
        public static StreamData ParseCmplexJSON(string uncleanJson)
        {
            StreamData cleanJson = null;
            try
            {
                JToken token = JObject.Parse(uncleanJson);

                cleanJson = JsonConvert.DeserializeObject<StreamData>(token.SelectToken("data").ToString());

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return cleanJson;
        }
    }

    public class StreamDataRow
    {
        public IList<StreamData> Datalist { get; set; }
    }

    
    public class StreamData
    {
        [JsonProperty("id")]
       public  string id { get; set; }
        [JsonProperty("text")]
        public  string tweetText { get; set; }
    }
}
