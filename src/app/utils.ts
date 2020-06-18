import { Patient } from './models/Patient';

export default class Utils {

  static colors = [
    "#3cb371", "#0000FF", "#9966FF", "#4C4CFF", "#00FFFF", "#f990a7", "#aad2ed",
    "#FF00FF", "Blue", "Red", "Blue"
  ]

  public static patient: Patient;

  /**
 * get array of names only for diagnostics
 * @param data :raw data handled from server
 */
  static getNames(data: Array<any>) {
    let names = [];
    data.forEach(record => names.push(record.name))
    return names;
  }

  /**
   * add is done false as init for all names
   * @param names : all diagnostics name to add is done to each
   */
  static addIsDone(names: Array<any>) {
    let items = [];
    names.forEach(name => items.push({ name, isDone: false }))
    return items
  }

  /**
   * extract all selected names only without id of patient peculiars
   * and return all names that doctor diagnosticed it for patient
   * @param records 
   */
  static getSelectedNames(records: Array<any>) {
    let selectedNames = [];
    records.filter(inspection => inspection.isDone).forEach(item => {
      selectedNames.push(item.name);
    });
    return selectedNames;
  }

  /**
   * mark with specific color all defined peculiars for patient
   * @param selected : all peculiars defined for patient
   * @param peculiars : whole peculiars that doctor choise from them to diagnostic patients 
   */
  static markSelected(selected, peculiars) {
    if (Utils.patient) {
      // complaints defined for patient
      selected.forEach(one =>
        //  all complaints
        //  test if any (complaints defined for patient) equal for one from (all complaints)
        //  if (true) mark it with specific color
        peculiars.filter(peculiar =>
          peculiar.name == one.name ? peculiar.isDone = !peculiar.isDone : peculiar.isDone = peculiar.isDone))
    }
  }

  static randomColors(max: number) {
    let bgColors = [];
    for (let i = 0; i < max; i++) {
      // this.colors.length to circle
      bgColors.push(this.colors[Math.floor(Math.random() * Math.floor(max)) % this.colors.length])
    }
    return bgColors;
  }

}