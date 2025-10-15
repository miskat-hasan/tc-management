import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shared/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shared/ui/popover';
import { ScrollArea } from '@/components/shared/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Check as CheckIcon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import flags from 'react-phone-number-input/flags';
import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumber,
} from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';

const FormPhoneInput = ({
  name,
  label,
  description,
  placeholder,
  ...props
}) => {
  const form = useFormContext();
  const scrollAreaRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('LT');
  const [inputValue, setInputValue] = useState('');

  console.log({ code: getCountryCallingCode(selectedCountry) });

  const countryList = useMemo(
    () =>
      getCountries().map((code) => ({
        value: code,
        label: en[code] ?? code,
      })),
    []
  );

  // Extract country code from current field value and set selected country
  useEffect(() => {
    const currentValue = form.getValues(name);
    if (currentValue && isValidPhoneNumber(currentValue)) {
      try {
        const phoneNumber = parsePhoneNumber(currentValue);
        if (phoneNumber && phoneNumber.country) {
          setSelectedCountry(phoneNumber.country);
          // Set input value without country code
          const nationalNumber = phoneNumber.nationalNumber || '';
          setInputValue(nationalNumber);
        }
      } catch {
        // If parsing fails, keep current state
        console.warn('Failed to parse phone number');
      }
    }
  }, [form, name]);

  // Function to extract phone number without country code
  const getPhoneNumberWithoutCountryCode = (fullNumber) => {
    if (!fullNumber) return '';

    try {
      const phoneNumber = parsePhoneNumber(fullNumber);
      if (phoneNumber) {
        return phoneNumber.nationalNumber || '';
      }
    } catch {
      // If parsing fails, try to remove country code manually
      const countryCode = getCountryCallingCode(selectedCountry);
      if (fullNumber.startsWith(`+${countryCode}`)) {
        return fullNumber.substring(`+${countryCode}`.length);
      }
    }
    return fullNumber;
  };

  // Function to create full phone number with country code
  const createFullPhoneNumber = (selectedCountry, nationalNumber) => {
    if (!nationalNumber) return '';
    const countryCode = getCountryCallingCode(selectedCountry);
    return `+${countryCode}${nationalNumber}`;
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="leading-[1.45] font-medium text-base">
              {label}
            </FormLabel>
          )}
          <label className="relative">
            <Popover
              open={isOpen}
              modal
              onOpenChange={(open) => {
                setIsOpen(open);
                open && setSearchValue('');
              }}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <div
                    className={cn(
                      'w-[68px] px-4 py-2 rounded-[10px]',
                      'absolute left-2 top-1/2 -translate-y-1/2',
                      'flex items-center justify-center',
                      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                      'bg-secondary',
                      'border border-border-secondary hover:border-[#2F2F2F] focus-visible:border-[#686868]',
                      'font-normal leading-[1.45]',
                      'placeholder:text-base placeholder:text-muted-foreground hover:placeholder:text-foreground',
                      'aria-invalid:border-destructive aria-invalid:text-destructive aria-invalid:placeholder:text-destructive'
                    )}
                  >
                    +{getCountryCallingCode(selectedCountry)}
                  </div>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput
                    value={searchValue}
                    onValueChange={(value) => {
                      setSearchValue(value);
                      setTimeout(() => {
                        if (scrollAreaRef.current) {
                          const viewportElement =
                            scrollAreaRef.current.querySelector(
                              '[data-radix-scroll-area-viewport]'
                            );
                          if (viewportElement) {
                            viewportElement.scrollTop = 0;
                          }
                        }
                      }, 0);
                    }}
                    placeholder="Search country..."
                  />
                  <CommandList>
                    <ScrollArea ref={scrollAreaRef} className="h-72">
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countryList
                          .filter(({ label }) =>
                            label
                              .toLowerCase()
                              .includes(searchValue.toLowerCase())
                          )
                          .map(({ value, label }) =>
                            value ? (
                              <CountrySelectOption
                                key={value}
                                country={value}
                                countryName={label}
                                selectedCountry={selectedCountry}
                                onChange={(country) => {
                                  setSelectedCountry(country);
                                  // Get current field value and separate country code from the value
                                  const currentValue = field.value || '';
                                  const nationalNumber =
                                    getPhoneNumberWithoutCountryCode(
                                      currentValue
                                    );

                                  // Set the field value by adding new selected country code + previous value without the country code
                                  const newFullNumber = createFullPhoneNumber(
                                    country,
                                    nationalNumber
                                  );

                                  field.onChange(newFullNumber);

                                  // Update input value to show only national number
                                  setInputValue(nationalNumber);
                                }}
                                onSelectComplete={() => setIsOpen(false)}
                              />
                            ) : null
                          )}
                      </CommandGroup>
                    </ScrollArea>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <FormControl>
              <input
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => {
                  const newInputValue = e.target.value;
                  setInputValue(newInputValue);

                  // On change should update the input value by including country code
                  const fullNumber = createFullPhoneNumber(
                    selectedCountry,
                    newInputValue
                  );
                  field.onChange(fullNumber);
                }}
                {...props}
                data-slot="input"
                className={cn(
                  'selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 border shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                  'h-auto p-4 gap-2.5 rounded-2xl pl-[84px]',
                  'bg-muted',
                  'font-normal leading-[1.45]',
                  'placeholder:text-base placeholder:text-muted-foreground hover:placeholder:text-foreground',
                  'aria-invalid:border-destructive aria-invalid:text-destructive aria-invalid:placeholder:text-destructive',
                  'border-border-secondary hover:border-[#2F2F2F] focus-visible:border-[#686868]'
                )}
              />
            </FormControl>
          </label>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-right leading-[1.45] font-normal text-base" />
        </FormItem>
      )}
    />
  );
};

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${getCountryCallingCode(
        country
      )}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${
          country === selectedCountry ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export default FormPhoneInput;
