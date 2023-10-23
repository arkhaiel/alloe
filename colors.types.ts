export interface Colors {
    inherit:     string;
    current:     string;
    transparent: string;
    black:       string;
    white:       string;
    slate:       Nuance;
    gray:        Nuance;
    zinc:        Nuance;
    neutral:     Nuance;
    stone:       Nuance;
    red:         Nuance;
    orange:      Nuance;
    amber:       Nuance;
    yellow:      Nuance;
    lime:        Nuance;
    green:       Nuance;
    emerald:     Nuance;
    teal:        Nuance;
    cyan:        Nuance;
    sky:         Nuance;
    blue:        Nuance;
    indigo:      Nuance;
    violet:      Nuance;
    purple:      Nuance;
    fuchsia:     Nuance;
    pink:        Nuance;
    rose:        Nuance;
    primary:     Nuance;
    cool:        Nuance;
}

export interface Nuance {
    "50":     string;
    "100":    string;
    "200":    string;
    "300":    string;
    "400":    string;
    "500":    string;
    "600":    string;
    "700":    string;
    "800":    string;
    "900":    string;
    "950":    string;
    DEFAULT?: string;
}