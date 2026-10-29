import type { Volume } from '../../types/books';

/** Router state passed from the results list to the detail page. */
export interface BookLocationState {
  /** List data, shown immediately while the full volume is loading. */
  preview?: Volume;
  /** True when coming from the results: "Back" can then use browser history. */
  fromSearch?: boolean;
}
