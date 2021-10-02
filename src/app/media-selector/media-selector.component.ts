import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { MovieActor, Movie, SearchResult, SearchService, TvShow } from '../services/search.service';

@Component({
  selector: 'app-media-selector',
  templateUrl: './media-selector.component.html',
  styleUrls: ['./media-selector.component.css']
})
export class MediaSelectorComponent implements OnInit, OnDestroy {

  selectedMedia: Movie | TvShow;
  form: FormGroup;
  searchResults: SearchResult;
  private searchSub: Subscription;

  showMovies = true;
  showTvShows = true;

  @Output() actorsFound: EventEmitter<MovieActor[]> = new EventEmitter<MovieActor[]>();

  constructor(private search: SearchService, formBuilder: FormBuilder) {
    this.form = formBuilder.group({movieToggle: new FormControl(), tvShowToggle: new FormControl(), searchTerm: new FormControl()});
  }

  ngOnInit(): void {
    this.searchSub = this.form.get('searchTerm').valueChanges.pipe(
      debounceTime(200),
      filter(x => typeof x === 'string'),
      distinctUntilChanged(),
      switchMap(searchVal => this.search.search(searchVal)))
      .subscribe(x => this.searchResults = x);

    this.form.get('movieToggle').setValue(true);
    this.form.get('tvShowToggle').setValue(true);
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  format(media: Movie | TvShow): string {
    if (!media) {
      return '';
    }
    if (media.type === 'movie') {
      return '(MOVIE) ' + this.formatDisplay(media);
    }
    else {
      return '(TV) ' + this.formatDisplay(media);
    }
  }

  formatDisplay(media: Movie | TvShow): string {
    if (!media) {
      return '';
    }
    const releaseDate = media.releaseDate;

    if (media.type === 'movie') {
      if (releaseDate) {
        return `${media.title} (${releaseDate.getFullYear()})`;
      } else {
        return media.title;
      }
    }
    else {
      if (releaseDate) {
        return `${media.title} (${formatDate(releaseDate)})`;
      } else {
        return media.title;
      }
    }

    function formatDate(d: Date): string {
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) {
          month = '0' + month;
      }
      if (day.length < 2) {
          day = '0' + day;
      }

      return [year, month, day].join('-');
    }
  }

  toggleTvShows(checked: boolean): void {
    this.showTvShows = checked;
    if (!checked && !this.showMovies) {
      this.form.get('movieToggle').setValue(true);
      this.showMovies = true;
    }
  }

  toggleMovies(checked: boolean): void {
    this.showMovies = checked;
    if (!checked && !this.showTvShows) {
      this.form.get('tvShowToggle').setValue(true);
      this.showTvShows = true;
    }
  }

  optionSelected(media: Movie | TvShow): void {
    this.selectedMedia = media;
  }

  actorsFoundHandler(actors: MovieActor[]): void {
    this.actorsFound.emit(actors);
  }
}
