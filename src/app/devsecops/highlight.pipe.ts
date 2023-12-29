import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, searchTerm: string): string {
    if (!searchTerm || !value) {
      return value;
    }

    const keywords = searchTerm.split(/\s+/).filter(keyword => keyword.length > 0);
    
    // Escape special characters in each keyword
    const escapedKeywords = keywords.map(keyword => keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    
    // Construct a regex with positive lookahead for each keyword
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
    
    
    let result =  value.replace(regex, '<span style="font-weight: 900 !important; " class="text-success highlight subtitle-2">$1</span>');
    
    console.log('regexp', regex, result)
    return result;
 

    // const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    
    // // Use a regex with lookahead for each keyword in the search term
    // const regex = new RegExp(`(${escapedSearchTerm.replace(/\s+/g, '|')})`, 'gi');
    
    // console.log('regexp', regex)
    // return value.replace(regex, '<span class="highlight">-$1-</span>');

  }

}
