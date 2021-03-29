import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public tweetStream: any;
    public isStreamResponse: boolean = false;
    public sampleStreams: Array<SampleStream> = [];
    public startTime: Date;
    public afteranHourPass: number;
    public perHour: string;
    public perMin: string;
    public perSec: string;
    public hashTags: Array<Searches> = [];
    public totalTextContainsUrls: number = 0;
    public totalTextContainsPhotoUrls: number = 0;
    public domains: Array<Searches> = [];


    constructor(public http: Http, @Inject('BASE_URL') public baseUrl: string) {
        this.callFirstTime();
        this.startTime = new Date();
        Observable
            .interval(120000)
            .timeInterval()
            .flatMap(() => http.get(baseUrl + 'api/Sample/GetSampleStream'))
            .subscribe((result: any) => {
                this.isStreamResponse = true;
                this.tweetStream = result._body;
                this.processNewPollData(result);
                this.averageTweets();
            }, error => console.error(error));
    }

    callFirstTime() {
        this.http.get(this.baseUrl + 'api/Sample/GetSampleStream')
            .subscribe((result: any) => {
                this.isStreamResponse = true;
                this.tweetStream = result._body;
                this.processNewPollData(result);

            }, error => console.error(error));
    }

    processNewPollData(streamData: any) {
      console.log(streamData._body);
        var sampleStream: SampleStream = JSON.parse(streamData._body);
        let newData = new SampleStream();
        newData.id = sampleStream.id;
        newData.text = sampleStream.text;
        this.sampleStreams.push(newData);

        //if text contains URL
        if (sampleStream.text.search('http') || sampleStream.text.search('https'))
            this.totalTextContainsUrls++;

        //if text contains Photo URL
        if (sampleStream.text.search('pic.twitter.com') || sampleStream.text.search('Instagram'))
            this.totalTextContainsPhotoUrls++;


        //Split strings and search HasTags and Domains
        let arrySplitText: Array<string> = [];
        let arryvalues: Array<Searches> [];
        arrySplitText = sampleStream.text.split(' ');

        arrySplitText.forEach(function (element) {
            let arryIndex: number;
            if (element.startsWith('#')) {
                
            }
            if (element.startsWith('http') || element.startsWith('https')) {

            }
            
        }   )

    }
    
    //Indicator 1: Total number of tweets received
    public totalNumberofTweets(): number {
        let totalCounts: number = 0;
        totalCounts = this.sampleStreams.length;
        return totalCounts;
    }

    //Indicator 2: Average tweets per hour/minute/second
    public averageTweets(): void {

        var timeDifference = (new Date().getTime() - this.startTime.getTime());
       
        //mode "Hour" 
        var timeDiffernceInhour: number = Math.floor(timeDifference / 3600000);
        var tweetsPerHr: number = timeDiffernceInhour > 0 ? (this.sampleStreams.length / timeDiffernceInhour) : 0;
        this.perHour = tweetsPerHr.toFixed(2).toString();
        
        //mode "Minute"
        var timeDifferenceInMin: number = Math.floor(timeDifference / 60000);
        var tweetsPerMin: number = timeDifferenceInMin > 0 ? (this.sampleStreams.length / timeDifferenceInMin) : 0;
            this.perMin = tweetsPerMin.toFixed(2).toString();
        
            //mode "Second"
            var timeDifferenceInSec: number = Math.floor(timeDifference / 1000);
            var tweetsPerSec: number = (this.sampleStreams.length / timeDifferenceInSec);
            this.perSec = tweetsPerSec.toFixed(2).toString();
   
    }


    //Indicator 3: Top emojis in tweets* 
    public topEmojiTweets(): string {
        let topEmojis: string = '';

        return topEmojis;
    }


    //Indicator 4: Percent of tweets that contains emojis
    public tweetsWithEmoji(): number {
        let perOfEmojiTweets: number = 0;

        return perOfEmojiTweets;
    }


    //Indicator 5: Top hashtags
    public topHashtags(): string {
        let topHastags: string = '';

        return topHastags;
    }

    //Indicator 6: Percent of tweets that contain a url
    public perOfTweetsUrl(): number {
        let perTweets: number = 0;

        perTweets = (this.totalTextContainsUrls * 100) / this.sampleStreams.length;

        return perTweets;
    }

    //Indicator 7: Percent of tweets that contain a photo url (pic.twitter.com or Instagram)
    public perphotoTweets(): number {
        let perphotoTweets: number = 0;

        perphotoTweets = (this.totalTextContainsPhotoUrls * 100) / this.sampleStreams.length;

        return perphotoTweets;
    }

    //Indicator 8: Top domains of urls in tweets
    public topDomainurlsTweet(): string {
        let topDomainurls: string = '';

        return topDomainurls;
    }

}

export class SampleStream {
    id: string;
    text: string;
}

export interface Searches {
    key: string;
    totalCount: number
}


