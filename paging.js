var Paging = function (page,pageRange,maxPages,TotalRecord,ad_per_page){
    /**
     * requered
     * page current page if not set default 1,
     * pageRange- range of pages that can be selected
     * other parameters:
     * maxPages - maximum pages
     * OR
     * TotalRecord  and ad_per_page
     *
     * USING
     * after load this object => run CalculateRange(isArrayWanted) with true or nothing
     * and return:
     * if  isArrayWanted array where the first param is a start page and a second it a last page
     * else object with 2 prop., first page and end page
     *
     * enjoy :)
     *
     */

        //first check
    self =this;

    self.page = (typeof page !="undefined" && parseInt(page)==page && page>0)?page:1;
    self.pageRange = (typeof pageRange !="undefined" && parseInt(pageRange)==pageRange && pageRange>0)?pageRange:null;

    //optional
    self.maxPages = (typeof maxPages !="undefined" && parseInt(maxPages)==maxPages && maxPages>0)?maxPages:null;
    //OR
    self.TotalRecord = (typeof TotalRecord !="undefined" && parseInt(TotalRecord)==TotalRecord && TotalRecord>0)?TotalRecord:null;
    self.ad_per_page = (typeof ad_per_page !="undefined" && parseInt(ad_per_page)==ad_per_page && ad_per_page>0)?ad_per_page:null;

    //result params
    self.StartPage = null;
    self.EndPage = null;


    self.CalculateMaxPages = function(){
        //calculate maxPages if needed and continue if maxPages is int that big then 0
        var maxPages = self.maxPages;
        if( self.isInteger(self.TotalRecord) && self.isInteger(self.ad_per_page)){

            maxPages = (self.TotalRecord-(self.TotalRecord%self.ad_per_page))/self.ad_per_page;
            if(self.TotalRecord%self.ad_per_page>0){
                maxPages++;
            }

        }

        //if(typeof number == "undefined" || parseInt(number)!=number || !(parseInt(number)>0)){

        if(!self.isInteger(maxPages)){
            return false;
        }

        self.maxPages = parseInt(maxPages);

        return true;

    }

    self.isInteger = function(number){
        if(typeof number == "undefined" || parseInt(number)!=number || !(parseInt(number)>0)){
            return false;
        }
        return true;
    }
    self.checkLoadedParams = function(){

        if( self.isInteger(self.page)){
            self.page = parseInt(self.page);
        }else{
            return false;
        }

        if( self.isInteger(self.pageRange)){
            self.pageRange = parseInt(self.pageRange);
        }else{
            return false;
        }


        //check optional
        if(self.isInteger(self.maxPages)){
            self.maxPages = parseInt(self.maxPages);
        }else if(self.isInteger(self.TotalRecord) && self.isInteger(self.ad_per_page)){
            self.TotalRecord = parseInt(self.TotalRecord);
            self.ad_per_page = parseInt(self.ad_per_page);
        }else{
            return false;
        }

        return true;


    }
    self.CalculateRange = function(isArrayWanted){
        if(!self.checkLoadedParams()){
            return false;
        }
        //check maxPages existance
        if(!self.isInteger(self.maxPages)){
            if(!self.CalculateMaxPages()){
                var error = {};
                error.status = "Error";
                error.message = "cant calculate max pages";
                return error;
            }
        }


        //find range for current page
        var StartPage = self.page-self.page%self.pageRange+1;

        if(self.page%self.pageRange==0){
            StartPage-=Math.ceil(self.pageRange/2);
        }


        var EndPage = ((StartPage+self.pageRange-1)<self.maxPages)?StartPage+self.pageRange-1:self.maxPages;

        var middle = Math.ceil(StartPage+(self.pageRange-1)/2);
        if(self.page<middle){
            if(self.page>1){
                var dec = middle-self.page;
                while(dec--){
                    if(StartPage-1>0){
                        StartPage--;
                        EndPage--;
                    }else{
                        break;
                    }
                }
            }
            //else stay like it
        }else if(self.page>middle){
            var inc = EndPage-middle;
            if($self.page%self.pageRange!=0){
                inc--;
            }
            while(inc--){
                if(EndPage+1<=self.maxPages){
                    StartPage++;
                    EndPage++;
                }else{
                    break;
                }
            }
        }

        self.StartPage= StartPage;
        self.EndPage= EndPage;

        if(typeof isArrayWanted == "boolean" && isArrayWanted){
            return [self.StartPage,self.EndPage];
        }else{
            return {
                'StartPage':self.StartPage,
                'EndPage':self.EndPage
            }
        }
    }






    return self;



}

va
