import _ from "lodash";
import PickList from "@lucky-parking/ui/src/components/pick-list";
import { RelativeDatePresets } from "@/shared/lib/constants/date";
import type { onEvent } from "@/shared/lib/types";

interface CitationDataPresetsSelection {
  onSelect: onEvent;
}

const CITATION_DATE_PRESETS = _.map(RelativeDatePresets, (value, key) => {
  return { value: value, text: value };
});

export default function CitationDataPresetsSelection(props: CitationDataPresetsSelection) {
  const { onSelect } = props;

  const onChange = (newValue: string) => {
    onSelect(newValue);
  };

  return (
    <PickList
      id="citation-date-presets"
      className="w-[135px] text-[16px]"
      onChange={onChange}
      options={CITATION_DATE_PRESETS}
      value={CITATION_DATE_PRESETS[0].value}
    />
  );
}
