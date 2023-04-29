import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(movies: any[], searchTerm: string): any[] {
    return movies.filter(movie => movie.title.includes(searchTerm))
  }

}
