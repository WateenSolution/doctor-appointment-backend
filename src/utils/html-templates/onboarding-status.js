const onboardingStatus = (data) => {
  const isApproved = data.status.toLowerCase() === "approved";
  const statusMessage = isApproved
    ? "Congratulations! Your request has been approved."
    : "Sorry, your request has not been approved.";

  return `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Induction Form</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            line-height: 1.6;
                            margin: 0;
                            padding: 0;
                            background-color: #f5f5f5; /* Light background color */
                        }
                        .container {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            min-height: 100vh;
                        }
                        .email-container {
                            max-width: 500px;
                            margin: 20px auto;
                            padding: 20px;
                            border: 1px solid #ddd;
                            border-radius: 15px;
                            background-color: #ffffff;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            transition: box-shadow 0.3s ease-in-out;
                            overflow: hidden;
                        }
                        .email-container:hover {
                            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                        }
                        .row {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        }
                        .image-container {
                            text-align: right;
                            margin-left: 0px;
                            margin-top: 5px; /* Top margin added */
                        }
                        .image {
                            height: 20%;
                            width: 20%;
                            margin-right: 5px; /* Right margin added */
                            overflow: hidden;
                            object-fit: cover;
                        }
                        .header-container {
                           
                            margin-bottom: 20px;
                        }
                        .header {
                            font-weight: bold;
                            font-size: 19px;
                            color: #224c8b; /* Theme color */
                            margin-bottom: 10px;
                        }
                        .status-message {
                            text-align: center;
                            font-weight: bold;
                            font-size: 18px;
                            color: ${isApproved ? "#4CAF50" : "#FF6347"};
                            margin-bottom: 20px;
                        }
                        .section-main {
                            margin-top: 20px;
                            margin-bottom: 30px;
                            text-align: left;
                            width: 100%;
                        }
                        .section {
                            margin-bottom: 15px;
                            color: #666666;
                        }
                        .section-label {
                            font-weight: bold;
                            color: #333333;
                        }
                        .button-container {
                            text-align: center;
                            margin-top: 20px;
                        }
                        .button {
                            display: inline-block;
                            background-color: #224c8b;
                            color: #ffffff;
                            padding: 12px 24px;
                            border: none;
                            border-radius: 5px;
                            text-decoration: none;
                            font-weight: bold;
                            cursor: pointer;
                            transition: background-color 0.3s ease-in-out;
                        }
                        .button:hover {
                            background-color: #1a3a6d;
                        }
                        .footer {
                            margin-top: 30px;
                            font-size: 18px;
                            color: #ffffff;
                            background-color: #224c8b;
                            padding: 15px;
                            border-radius: 15px;
                            position: relative;
                        }
                        .footer-info {
                            margin-top: 10px;
                            color: #ffffff;
                            font-size: 14px;
                        }
                        .footer-row {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 5px;
                        }
                        .footer-label {
                            font-weight: bold;
                            color: #ffffff;
                        }
                        .align-right {
                            align-item: right;
                            margin-right: 10px;
                        }
                        .align-left {
                            align-item: left;
                            margin-left: 10px; /* Add left margin to align with the text on the left side */
                        }
                        .footer:before {
                            content: "";
                            position: absolute;
                            top: -10px;
                            left: 50%;
                            width: 0;
                            height: 0;
                            border-style: solid;
                            border-width: 0 15px 15px 15px;
                            border-color: transparent transparent #224c8b transparent;
                            transform: translateX(-50%);
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="email-container">
                            <div class="row">
                                <div class="header-container">
                                    <div class="header">Induction Form</div>
                                </div>
                                <div class="image-container">
                                    <img
                                        class="image"
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAg4AAAGoCAYAAAAuFm1XAAAACXBIWXMAAAsSAAALEgHS3X78AAAgAElEQVR4nO2dD3BdV33nz3NMoRCQ2X+l7TASszOddqezUoDGCYn9nikLJE2RQtoCBSLJw7bmT2MZIuupNLU8QPUkBSyxNBiWjSQgy58CeSrexGVZrGcnJAqQSN3tbNlpJ9J2GZoOUD3yh8S23t05z79rXz+9P/fe8+f+zr3fz8wdJ5b13rn/zvme39+c53kCAO58aiU/K4To0zDMTSHE7B/urizjpgMAQHQgHABLPrWS7yOhII8BIUS35nGuCSHKQggpIFb/cHdlE08CAAB0BsIBsOBTK/keEggFOrosj6sqBQQJifIf7q6s4skAAIDtQDiAxCCrwpAhi4IqVbJISBFRxlMCAAAXgHAAViHLwhAd3MRCKyAiAACAgHAAVvjUSl66H0aEEP2OX3EpIhYowHKdwXgAAMAqEA7AKCQYJoQQ+RRe6Yo8N2RoAACyBIQDMELKBUMjEBAAgMwA4QC08qmV/C4SDAczeGWlgBhBRgYAIM1AOABt3PVQfiiXEyUhxC/4n5lr9eG5Nj9jSqtXZdtfe+JLnhDF91yLGAgAQPqAcADK3PVQ3S2xoDtLwqawMPQWzEnry3uuRXEpAEB6gHAAsbnrobpbQpaCHsRVbInMwph9z7WVCabjAwCASEA4gFjc9VC9eJO0MvTiCoZiQ9aueM+1CKAEALgNhAOIzF0P5QdINNguC50GFmUAJdwXAABXgXAAkZABkEKIeVw1JaT1YeA91yL7AgDgHjtwz0BEZnHBlJFBpI+RCAMAAKeAcAChIRcF3BP6mId4AAC4BoQDiMIArpZ2IB4AAE6BGAcQmrseqne2lI2q5J/N/PMy02IX/dyVzpeJI1/Bmifu/KPrKqMZvxQAAAeAcADGoMJQUkQUSFQ0Td2UT2DNM1eFiStNTndNpmzedh2CJgEAfIFwANagglGFwFEXEjWPhAMQVDBq5LbrKgu4GgAAjkA4gMQg10eh5omBmif6cScu4+ht16HaJACAHxAOgAUff7AuIiZQvvoyFm+7roLASQAAKyAcACs+/mDdnTFCB1I/IR4AAMyAcAAsgYC4jGHEPAAAuADhANjz8QfrdQ4mgimeWXpqqb34vtuuQ4MsAEDyQDgAZ/AFhJfBGhE5IZ4SQrz8tuvQHAsAkCyoHAmcQZrrb7uuIoMo76C0xczgCXGlJ8TX8LQCAJIGwgE4x8HrKh+mwlJLGbt7++YezH+CwTgAABkGrgrgNHMP1htvLfgBlB6VcBaXYgNSBZ3aVYeuR3VJAEAyQDgA55m7kIEhxcMbap54QQbu6IYs4X3oesQ7AADsA1cFcJ6D11U2D15XGfA8cTAjsQ/dJJQAAMA6sDiAVHHsgXwfLapNG2qljOFD16O+AwDALhAOIHUce6DuupjNQPlqaV0pIN4BAGATCAeQWo49kJdVJ4+l/A6vkXhAvAMAwAqIcQCp5dD1FWl1uIqCCdNKryfEF/EUAwBsAYsDSD3kupCxAP3yca/RkQZkymkuV09Bfe9ovnIXnmYAgGkgHEBm+NiZ/J+er4mjKT7fqw7nEe8AADALhAPIFNOVer+L+ZSec72+w+E84h0AAOZAjAPIFIfz9fTF4ZSeczd1EQUAAGPA4gAyScotD/sO59GCGwBgBlgcQCZJueVhlsEYAAApBcIBZJYUi4desqgAAIB2IBxApkmxeECsAwDACBAOIPM0Ew+e+0f3VCV/e9bvLQBAPwiOBIDwAya30vNK/FS6LcYLlXUGYwEApARYHAAgpOXBE+L9KboeLxFClBmMAwCQIiAcAAgwlq/IplhzKbomvZPLecQ7AAC0AVcFAE2YXM7L0s29Kbk2sv12z3gBFSUBAOrA4gBAcwZowU0DXUKIEdxnAIAOIBwAaAIFFKapFsL7GIwBAJAC4KoAoA2TyxdLU295nrjC1bdFtt4WQuz540LlgcQHAwBwGggHADogxYPnifkUvClLH9xXGWAwDgBABO559OpdsvOtjFWioxXr/vH2Vz5iLA0bwgGAEHzkVD0z4UgKrtW+D+5DAywAOHPPo1f3UZxVgQRDV4zhyhgtGeQt3/fVt7/yEW2p2RAOAITkI6dSkWlRz7D44D5kWADACRILQyQYug0NbYlqu5Tf/spHYs8BEA4AhOQjp/I9pODjqH9OwGUBABPuefTqIcp6srkpqZKAmH37Kx9ZjfrLEA4AROAjp/Jywb03Bdfs5g/uq6CqJAAJQYJhwqB1ISwVOY63v/KR0C5MCAcAIvKRU/lZIcRBx6/bhvSdwmUBgF3IJSHnkDyzSx9aQKCOAwAR+eC+ijQrrjl+3brJlwoAsMQ9j14tLQyPMRQNgsZ06p5Hry5TFkdLdiY7TgCcZYDiHa6syfoODhnuZE2HHRfqOsi22wuJDwiAlHPPo1f3UEyBC8HV/TKd855Hrx55+ysfaTo/wFUBQExkvMNWTdzr6iu0Y4d4rlYTv3rkdWi7DYApyDWx7GhQtczCGGrMwICrAoCYyOBCz6v7BZ2kVhPPh8UBAHNQAKSrokGQ9WFbzAOEAwBquN6yOn/0m3k0wAJAMyQa5lOQvt1LVpOLwFUBgCJHv5kvkzJ3lXpRqCOvQ4YFN46v7C0Eygz7ZYeb4Zca3qTYm9UDu0/jfibEPY9enZa0bZ99wWwLBEcCoM4QTdqu7iz8ttuuW0+c5vjK3l1UYniABEKUQLptUfrHV/ZukJm5fhzYfRqxLBb47Pd2D+VEbjKX80TOjSFX/bLU9P/+c9gb+PllRaJgcQBAA2TuP+bwtaweeV2lbQoWMMPxlb1+mWHTVqs1iuxfgIgwgxQN5J5giRQyO3IX1/xFKj3dtBAcZYL0NGuYBeEAgCZS4LIYPvK6CoIlLXB8ZW8PWapGErJUVUhA4H5rgrtoIKo7cl45d6HQU2zxCOEAgCaOfjO/y3GXxdKR16GHhUnIHSGrBg4yGdIGZdbMIiYiPp/93m5p2j/FfJjS4lS49VUryvcZWRUAaIKCC4ccvp4uW0vYc3xl7wQJSy6iQVAFUdkufp3GByLy2e/tlmLwL/3f8hgdMuuahlXVJRoELA4A6OfoN/ML/uJQc+/1+q2j/6FyH4NxpAbKjFhg0MwoDNICMXJg92k0QAvJ4vd2nxRCvIHr+HIXYhkmbn3Vira4FmRVAKAf6bd+7VZNvNxBWf4rQggIB00cX9nrWkM0KW7uPb6yV8ZADCGIsj2L39u9wFk0yLilW1+1oj2OBRYHAAzwp/89/y7PE//ZwWtb75r5odejpoMKFPzoSm+COue3LljI5JJwbqu+Ljy3VROfHtt35rbkR8ePRf5xDcODBkSDgHAAwBx3fCO/6Wig5NyHXl9BNcmYHF/Z60Rvgq2aEM+dE+K58544e77tP5VicujI6890bLecJRa+t3s1x1cYGhMNAsGRABhl1tHLe/COb+QLDMbhHFST4THOokGKhH9+2hM/etITTz7bUTQIcl+cOvqNPa4+z9q5+7vXzNa8XO+WlxP+UQscCQdI/heTokHA4gCAOe74htPpmZUPvb4C8RABEg1s8/jlVP/Uc5545jmlj6mn9B15/ZnMurLu/u41nMtJb+x/9cM9pr8EFgcADEFxAq6muG0rYQxaw100yPiFnzytLBoExWwsH/3GnkxWGb37u9fI8+ZcNMtKOjiEAwAG+dDrK7O0S3MKT4jzf/xXeZSgDoErokH+qYksiwf5PnO1IC7uf/XDVuJQIBwAMM/FQEOPajtwPrYujG0nNboBbaBASPaiwYBHOnPi4e7vXtPHrHhXkGpwnjENhAMAhvnQ6ytyFzDniwZOleWaHQFQfroNlHLJNtNAioXNZ4yIBh8pHu4x9un84BwcOrL/1Q9bizuBcADADhOeJ37s2LUegLuiOdRzoszVbC0FqsycOLdlzrpFeuTGiW/sOZ70+Zrm7u9e08M47qey/9UPW427gHAAwAIyUNIT4vOOXesux3tvmGSCa3EnuajLVMufnTPrEpN1IOTheWLoyF/teQuDUzeGJwRncWT9HYVwAMAeLubBoxBUA8dX9g5wLSPti4Zz+gIh20Lut+fXPPGpO07u6bPzrXb59HeuLWx5uTfUazXwcyce3f/qh62XBUcdBwAs8sd/lV92MNVx35+9oYKqgZdcFGxrc/z4KU88ey6xr6/Wy5W/8Uyq+lt8+jvXrnNrUJYTQlyR857Y/+qHX5bE98PiAIBdXKzrAHfFJdim4/30Z4mKBkHXpXzHyfRkWnz6O9eOcOxqesHSk9uf1PdDOABgEdq5Vxy75kjLvNQem2U6nnRNPPksg4FciPtwtejZZXz6O9fuYnwulXf9xkOJdbGFcADAPq7FDbDbcSUE2xgVmUHBiIN3nNyTBrE5wrjYU6KCBsIBAMv82Rsqq+JClPaWF4hQP8/4GL0vn+kgSaoOyTKL4pmzwlowZAQ4l2UOC9dnvvIHv/FQojFHEA4AJMC5LTF+bktccZ5S2up58YwPucMZvS9vvHkOY9ia36vPsAxw777j5J5xBuOIxae/c+0QrA2tgXAAIAFmbqw3wFp06Np3pcV3HRWyNrB01zz9nBDnpKXKu3RsJVjOfMu7NAZPiDsYXKK4wNrQBggHAJLDtYV4MKNWB7b36emz3jZrlb+AJ3HUAmM4XxM/P37fnk8yuEyRkHUbuLqluDyLEA4AJMTMjZV1BzMsMhXrwNnaINmRYzCINnhCHCje51agZM3LjdS8XLNiS0mzxMHaICAcAEgc16wOWavpwPn+bLzgebm/YTCOTiwU73OjtsNdj7ympyZEf60euZyrH+cDx1ZCBwkYNqIdwgGABJm5sV7XYcOhe9A1el8+E10zqbQ0V2vD4oHdp3tu33v612XnVQbjaUe3Q5aqtkIxqRLTW15u7Q9+4yE2FTkhHABIHtesDllpt811sasGx1a68cyIA4G2I9ytDtLawLXAF7f0VggHABJm5sbKAi0GrpB64XB8ZS/nNsoLB3af3gz+RenGM0PM42Vc6LTKWcBDOAAAtuFS50zprkhlJ8QAnE3rrZ4VKejWGv+SUX2Q95m/NErcwnRcc++5+tubIf6dNSAcAOCBay23096/guvueOnA7tNNfd2lG89s0n3ZqPvFqRJpUqmZTY5/e/uJPSyv612PvOYPhBAvaBQ7DPgBR0sIhAMADAgWhNqiEtSsD0/cnNbnhlIwuVYNbCswSTwMbNXEUyzrSQoxe/sJfrEOnife5nliZ5O/T9xKw83aICAcAGDF7JY/YSQYwR3q8FLd+IprDMfGgd2nO+bxl248I3uhcK3a2MXNDfTnK68pMLWgVd67+9tlBuPYBoQDAEyYubGy6nnbfdRM6T50In1pmcdX9srdcD+DoTQjtMn6zpvOzDaLd2DCCDOrA1e3FNtGYRAOAPBi1aH7kcYqklzFkMy6ibr75Logssmw+POV1+xinILJ0togIBwAYAeLkrIhyR86kbrsCq5iqNyYgtmJO2+quyy4Foficp25BvmuvXc3v9gGHwgHAHhRdqymQ2qsDuSm4NrcKG7WzQTTyqTdt5/Yk7jorIncTZxihwKwdVMICAcAeHHspnp2BVsTZRNey25E8eHqplg7sPt0LBfWnTfVsywuijvZvGmrluxRbyB1YZVM1F0x9/D1u2pe7ne2vB2Cy3Heqy/J57nPARAOAPDjYhCcx6uAz+XHhSH+UoqeH67CQanGx503nZGL0JJcsGsMMnYutP3OifO13H8c+cu9SQZJDnBMu93ycv/jvbu/zaYvRTMgHABgxrGb6u226zUdWKdmevVF4IqDX8+npWMm12wKHbvPEc8Tz2r4HJ28MGFXF0s3mydyJxkMoy0QDgDwZMIT4jlH7o3zwoE6YXJkMWpQZDPuvOnMuifEFMPzG0nC6jD38PU9jONZ2LsqIRwAYIi0Onie+Joj9yZ/8Ov5HgbjUIGrcNC5iHAsa96V0LVnW+Tr4DUPsHZTCAgHAFjzDYduj+vFoDim5VUP7D6tTTjMvun0JtP220k8O1zTMJ0IjIZwAIAvLtV0cNZdQS20OZbQNpGSx7F1dBKxJVzjWZxodgfhAABT5n67HiTpSgnq3oNfz7NrXhQSrtYS7cJh9k2n14NWhxqTzpnvK++1JjznHr6eq7Wh4oKbQkA4AMAe1oVgGnC11TbHcW/Erd0QAml1OC+7nNaYpPZaznCoC0WP6lokcbQo+uRMa30IBwB441IxKFfLT3MUDsbuu7Q6bHlixQvxby3S+77yXiv3oebl3rrlbV/A7dayuCRYaCw/OHjNA8686xAOADCG3BVLjtwj5ywOx1f29nEsAmTa0uR54ismPz8mxt0VH3tozy5PiF8w/T1R8YT4E25jageEAwD8qZswWVeRvFAM6lcdfJay5qbw4bi7tRFrgmwKDUA4AMCcud+uLG/VxPfPbQlxrsb3OF8Tv/DusnPdMjPlpvD5xEA9SLJi+nsi0vW+svFCXByfz433X3uGbSfMZkA4AOAAW5447sh9cq1bJseFxNbuk2PgrWkhx1EoOpFJEQTCAQA3cMWU6UwhKKb1G2TRJyv1Oz4xcHqhseV2UsGCAd5o+LTzhj8/Di7Va6kD4QCAA3xywJmaDl3vLuddCZLMsrXB50Jqpld3NYmthI76d1+Ik+k58DUzvSvu/Paet9Y8cb524XsSPwKCyan4BgHhAIBTwOqgl8wLB2l1qHni+x6D3EwKsH2+qefHE+KNnhA7uXSXJfHw1fdfe8Z0IKx2IBwAcAcIB71wtIxYN1vXPPFN29/ZAe1xMjPf3iOtGIO6P1eRas0T72I2plBAOADgCJ8cqKw2+qSZ0v3ushPdMrlZHCo6WmjHgJuPvffA1/bqvjcss2dGX+NWNoUPhAMAbuGK1YF1nAMFRnIr/JTUveUYnKfbasXRCuZcUKQPhAMAbgHhoAeOFpFEFpLjb65bObhVJ9X9/HCMZ3EuDdMHwgEAh/jkQEUuLlUHRsy9EBQ3YWOjWmQ7uAlS3WmTvZo/TwfOBUX6QDgA4B4uWB16311m3Wabm7BJ1Gx9/M31mg51QdqktsJlaO6K2ZIDX9urxSo08+09BXExkyGZbpj+ETjlDVfjGwSEAwBO4oq7grPVgZurgoO/e0Eu5n4th/MtDllvQdfR7js8T1yj46RqXu6q4MKdbArmRfHgUrv8bUA4AOAYnxyoXBQOXIrZBI/ATvJaxleWm+mag3CYrTEYhCCrxpYn/lHLZwmRZ1Cm4iI1L/ek37jOVSAcAHAQzxPfT7LSX7vD3zXWPPEGjlf2+MpebvENawd2n048UO74m0+ve574m6THEUC5zXbpwbq7o1/noDRwt8tuCgHhAICbeEI8wKHaXyt8kzdT4KZoDadiUIPv+opynAPHNEznSkw3AuEAgINs1cSHHRg1x4ZCAsKhLdwi/ScUf5+dcCheZ6eJmUkgHABwkM/cUm96xT4t811fZdnwituYOC0k23bDCQcU/rri+XATry6kUncEwgEAd3Fh58Ixs4KTxWEtoTLTTfnM71wqBlXzLnasTPL41eG/iNcts/Tg3ktpmCKX6BHwKjpbuyEIhAMA7uLCJMTR4tDNYAw+HMXfbKdaDhZ5kYK74Y2+WEg8DZPGAeEAAEgaWBwiwjCjgt1C8pnfOb3seaxM6rGEw5bIvYlh/LDzgZECwgEAd/nMLRUXhEP3u77KqoIkAiND4PEqUBRZ7H3kwXpsza+ZGU48PCG+l4bASAHhAIDzcGtO1AxOu3xOwmGDQ/2GFnCyhHQN/0XktEyOLrKnGIxBCxAOALgN3BXR4LSgcL533FwokYSD5+VuMjeU2KTC2iAgHABwHhd8prA4NIdtoNz879Y7dW4IKuZV85KpQlq71BDrhWHH/uEHClKovsqTfSEYHAFSERgpIBwAcBuq57DB/CQ4WRyQURGeCV80JFWl1LuUCvpzEX5txOCQIkPi4bkPXldJRWCkgHAAIBVwn5C63vXVfOLigVtGxYHdp1nvQOd/9/RCzRNPMhiKiCg+OZaZ/jaDMWgDwgEA96l32vPatCnudLQq9BP38wKNrnw4WB04WT4qDMYQhkeZjCOUGCA3RZf54UTD83If4zYmFSAcAHAc6a6oeeLvz5IAiHPIRf5ckyPu5/mH/IyzFwTEmxlcZU7xDa4EynHJ+ui99UuhMitusDCWOKQmo0JAOACQDrY8cZLriXgXBMSrGQyFk8XBlUA5TuPs6Go674n+8179T+NH3Uonmh9b9P3UIPZnaQqMFBAOAKSDmie+wvxEfvGdX84nvePn1PDIlYWEk2WkrbviyJlCwRNit70y0q0tbTX6NyQgPv4n1y+z6UeiAwgHANKBCwtRYkFrx1f2crI2cC78dBmffUs9gJNL+en+W7/UtuGVagtuI3hC/C3HcakA4QBACvjc71U2HUjLTDKrAW6K+Fy0OngNwbO60zRbdeEM0PQ+SmsDwxbaPk6IxCjsdGeoAIAOrDKrU9BIf4LfDeEQn7Lnif6zteQGICshPG+HELlcXXw2c5+wtDZIju5ZTk3FSB9YHABID+wXpHd+OZ+Uu4KTcHBtISlvJdxmUn69FC6eEC9o/Blza8MagzFoB8IBgPTgwoKUlLsCgZEx+exbTm/WPPF9DmM5uyVe1+Sv2Vob0tSfIgiEAwDpAQGSTWBWMXLtwO7TzkXYe0J8kcEwJK96y3+9VM+BubVBQDgAAFhDAZLcTaPd7/yy9fLTiG9Qh5PYCQpBztYGAeEAAHABuCuS/752uCocOI27LgT/9My+Gz2Ry3siJ+wfoVg6uidd9Rt8IBwASBcuCAfb7goIB3U4jXvgT06/tq/m5b5Q83IimWOH2GpzkLBITTfMRiAcAEgXLgiH/Du/nG9XyEcbVPiJTdOjA7tPO2m6/tLvn+bkBuuuPl37lBDiJQzG0hTPyz0H4QAAcAJH4hyERSsAq8BIBmNQgY3o+enT3r9jMIx2nEyrm0KgABQAqWTB88Sx8wkW7AnBQUs7Mk7CwfVAuQV530xUjIxCLlfv5nplciPojCdyqbU2CFgcAEgl5VrCBXtCUHjrF6w0vUJ8gya+9PunVz1PPJGkaBBU9vq5s544d571Q56qbpiNQDgAkDI+93uVdc8Tf+/AWY2Y/HBu8Q1pWEw8j4/V5EdVtia1jQ/v/RaEAwDALTwhTjgw4KG3fsFokCQna4MMjHRfODDq9Fh9mq3VIdVuCgHhAEBqcaEjX5fh1ExOwqHCYAw6YCV+mFodFhiMwSgQDgCkE1cC8UxW/kN8g35YPVfS6iClQ5KHbAAWsHtU0u6mEBAOAKSTL76tIievqgMn1/3WL+S1L/AM4xtSUXr4K++o13NY9P+fg6Pg3JYQMhg4qcO7JB6eMh23wwUIBwDSiyu+VhOT7ZCBz1QhTbvQkZonnjxfy4mtWk6cT/j40SYPd0XNE8ezYG0QEA4ApBpXhEO/gdRMTm6K6oHdp12IOQmFtDrUvNyjXMbzz0964plnk7d9eEL8eeKDsASEAwAp5Ytvq5QdcVcInVaH4yv1tsu9uj5PA2nchbISpT/8cU1sJWt4qJTy30qNOOwEhAMA6cYVq4PO1Exuboo0tlZm9VydO39BPCQI9/beWoFwACDdzDpydjpTMyEcDFO+tbLOLcX0qWc88eQzibgspLUhjeKwJRAOAKQYyq6oyOhvGX3O/BhXvRPHV/bK2IZuZnc0rQFz7OoVJOSyyJS1QUA4AJAJFhL2/4blV275vHJqJrd0uI0Du0+nskti+daKFA4bDIZykVrNustiKWvWBgHhAED6+eLb6hP8zxw50diuFQqK7Nc7HGXSvqhcdAtJq5YUqEkfP33a837wIyviocrQLWYFCAcAssGXHTnL3ls+n49rNeBoMk51Xn/51ooURvfJBdsvhpT0UfNETqZoPv5D426LoVL+W6m0JnUCwgGAbODSzvfYLZ/P90X5BbI2DJobUmxSb8be8sQ4x1ZTTz9rVDzMlfLfSn0zq1ZAOACQDVyb5Mq3fD5SeibHxkLVNHTE7MTXByt/zbWJ17NnPfF3P9iq/6kRGdeQidLSrYBwACADfPUdlct6DDhAd1gxcHxlr0zjzDM8pSwFzbHNLJA1HqTl4ad6UjXXshrXEATCAYDs4Fq73/5O8Q7HV/buYnxemTFlnxiqxzqwFabSXfF/n6hFTtc8e16Inzzp1Y+tmvh7Wco8q3ENQXKex9E7BQAwwS2fzy8z3Z2346qvvqPS1OR/fGVvmWEmhaCI+560pmI246aFumtpmVm578vI5YR44Qty4oXPz7X8Nz87WxcJ4uw5ry4ciOrL/sWO3vn+U6zST5NiZzZPG4DMIk3Kpxw7eWlR2BYseXxl7wRT0SCZzZJoEBesDps3LeQHKJOkq55dwWRf6gX+Q7osIrotpAgsQDRcAq4KADLEV99RNylXKG2N/3Fhrpcpmpf50I+v7JV+5iNM79yGQ6W+tXJiqF6KuuAJ8SMu6ZmK2qUuGu4fbm7xyioQDgBkjJoQ01u0KLM/vHq6nzjvicP9n6vvZn3RMM/trv3snBBrP9xx9m//acdY1qwNQU4MVVZrnvhdPiOKDURDCxDjAEAG6f9cfp1hT4eO/OKLxX/q+0XvjziN6VxNiL/70Q6x/s85sSMnfnjvO0/9EoNhJc4N83mWAi8k0mo0ANHQHFgcAMgmrmVY1Pnhk+KPfvocg4EQP30uJx5cv6IuGsQFC8mnGQyLBfcP10udDzs4dFmTog+ioTUQDgBkk1kyxTrHyj/kBAfx8IOqFA076i6KAE4KMlOQeLjZoWft0P3DFemeyHzKZTsgHADIIEvvrE+MTgbwna8lLx7+9z/tEH/9j9umz8WlW0+tJzMivtw/XClTVswa42FKK8Mr7h+uZDKoNSqIcQAgo/R/rp53Lxe6LlevwL9/mSd++SX2vk/GM/zPH+4QTzzVtA7AKyAc2nPDfL2g1wSjZ07GMiQIl+QAACAASURBVIyQuAEhgXAAIMNQpsK9Ll+BnpcK8Wv/2vw8JuMZvvv/dojnzjf9sbQ2ZL4UcRhumK8L1tmEm5JJwTBBrhQQEQgHADJO/+fyXKsvhubfvEiIV/2ymbnsmXNC/J8f5eoxDbm6oSEnGuwN9SqRS7eegl88AjfM53uo78OIRQuELIu9cP9wJUt9RLQD4QBAxiGXxaqfnunUjOAXGfKE+PnnCfEr/8oTL9e0BEnB8PhPcuIfqhfiKhq5IrfjWSHEC4QQ+5ZuPYWFSIEb5uuWL//QKSKqVAZbiuMygh71AOEAAJDioSBLUder/Tk+JUgB8bIrhXh5lyde8oJov3tuS4h/fEqIJ57M1f9sh7Q77MjlhpduPQVzt0ZumM/LQMoCBVT2ROytUqG4HSmEl5FSaQYIBwBAnTd9Nl+ueW67LBqRIuJfvlCIrudfEhHy/wVZFGQqpRQLMn7hx8+I+hGBoycGK2zbSacNEhS7mpzW+v3DFQSlWgTCAQBwkZsW86ucuxsyYvHEYAXBkCCToI4DACAIFsPOrFFAHwCZBMIBAHCRE4N1n/AcrkhLZLDd0IlBBNmB7ALhAABoZIJ5lb8kGSJxBUBmgXAAAFwG7aYLQuT+F67MRaSl4eYTg6gwCACCIwEATblpsSAj2B/zPPHymuddkeWrlMuJPfcNVR5gMBQAEgcWBwBAU04MLkvLw1W5nHgi41foKEQDAJeAxQEA0JbfWijcWPO8/5bRq7R2/3Clj8E4AGADhAMATClNzeyiCno9VAmvhw5BVfUai+FI//tCcWxUe8T/DfN52ZToYMaeFRkgWkCZYgAuB8IBAIaQaIjT8loG8RWKY6PaI/8zJh6WZAYFRAMA20GMAwA8KcRs9tNFlgft3D9ckUWP9lFL4npPi7QcAaTwGr5/uDIA0QBAcyAcAOCJil+9uzQ1Y8QvT+2I+zxPnDLx+QkiBcOUdAXdP1xB0yoA2rATFweAVNKsGZAWaCf+2jfenRrXxZLniaGT+2FhACAMsDgAAGJxcn/ddXEz7dZdRLpcbj65vzIA0QBAeCAcAODJsgv35eT+eiVF6RapMBhOFI7KcdP4AQARgKsCAKDEyf0Vmf1ReOPdedlZczZmUKctFmUvDhozACAGsDgAkE6sN2I6ub8eVNhDu3lu7gspGF5xcn9lCKIBADVQxwEAhpSmZmQ6ZuzMheLYaC7Js3rj3XkZnDlCR1IWCClepJiZhVgAQB9wVQCQPjaSPiMKNpTtuSfIhTEghOi39PWyeFOZLCAAAM1AOACQPljtrmkBXyArxAAdcQtcNWONgknrBzIkADALhAMAwAq0oC/QId0ZfZSR0RPovSH/u7vFePzMDRm/sUlCYRVCAQC7QDgAABLh5P7KahJBnAAANZBVAUD66ME9BQCYAsIBgPTRytQPAADKQDgAAAAAIDQQDgAAAAAIDYQDAAAAAEID4QAAAACA0EA4AAAAACA0EA4AAAAACA2EAwAAAABCA+EAAAAAgNBAOAAAAAAgNBAOAKSPNdxTAIApIBwASB/oFgkAMAaEAwAAAABCg7bagDWTpemeJt0eN8eLh9PejrmPwRhYMlmaLgghdoW4Ruv+MV48vJ7RyxWbydJ08Br30TVvxjL9Ha6zQSZL0+3ugdU5Med5nq3vAqAp9EIUSCD00Z9hOzxu0OKw6v85Xjy8HOL3WFOamikLIfoVxvjS4tio8y4LEo4D9FwUFDp/VukZkc/GchqeEZ2QSCjQ0UdHV8yvWKNrvUrXOu0iXys0HzYeUe7FWmBOXKU5Uaugy/3Z5FQhxu85qyxb7GB9UqGYOyjTbdieRAOLQUFxcWxHRQhR5jBxlaZmhpo8c/KabxbHRlfp3+wK7OrktRlU/Fo5eUzEiHdYTVpw0PMxQtfBVIvwKj0f5fHi4bKh72BN4D2Uz2evwbFu0PPO9lo3WFdE4w6+0881fP9AYE408cxfvAc0Jyq941I4xDU5yIl5QHUAtqDFdFYIkQ/xlf5FnnBJSNA5lmM+eDebfKnpxRuyMEk1Y4Pufdn2/SxNzSxoEAG2GS6OjS7Y/tLJ0vQQCYYkng95vrOuzGcqkKtnxKBob4d/rRe4zK00by7HsLAcHS8enlD4Xl8gDylYd+Lgi+bZuOJHRThIFseLh4e0nY4haNFaj3Fz5AUuuGJqmyxNryuoVaWXoBX0Uo4wWjwXadIybmUpTc3Ic3/M9PcYoFIcG41jiYwFCYYJg9aFsPgT6kgaBQQJhomQmycbLHLYnE2WppdjXpON8eLhVtbrdt/XQ/eBw5woDQBDUe+BanDkIKkl7ozEVHRdNJFEfjhsQwt00hPvRSJaeGwin9nBydJ0hSYtkwJigNm5s4KRYPDpoudjYLI0PZsWC4QD7+IcvYtJXeu41yXSc8tMMPjIc398sjQdaeOonI5JKpY7KuKmmyY47qguUloWUGndmSxNL9BOm9tEFUSO7ZQcK1mkTMBecCaBnEBplzfPSewGkALiiIz3cGR+a8lkaXrCgXfxoLQIOzLPxoLuwypjt+WRydL0KonMjuwg85wKrF8sUnmqk5MLO0el9D0dO28K8Fl3zKc/SJOWiXsM4dDAZGlaWv8eZ76Q+XSTuJw1KC6NIBcAuRCQAHIBKdbmJ0vTZZeudSdh2XAfbMYxxEHGFi2HEQ87NCz83BW5jvElEUQUFZXzrKh8MVkZpEvnXgdejmbIMd/r2qTlEvSMSHF6zMHhHyTrgxO1NWjnvpxAkKkO+knIO1/HxNH70BVGPOygwL8lhS/ivnPQImw4myzpJqss2LGtDYGIZBfEVSf6wyrukLiav65VPNH1XHXEytCKbno2WJvTySQ+76iA95Fjf8xl1wW5a129Dx3Fgx/joGSmNmTm1YWuBT/N5xjr/pOYcnVn04rQ5roQuBpYp+1+0tywzDSWISq+OV179pEOaLFyxTURhnlybTkDWdY4xzKExRcPTd2tvnBQ3Rmx3I1rim/w4eySURpbnPgG2g2ccnxn0wrndzwcoOvnqvuqHUdokWYDjcf1xaoZx7hd6wYai0SlaSPlZxVuoy4cNATGcV1UdY6rl7H/W+U8I7upaEGYV/hOV5iHeIhHBp6RQS4LWopFg88gpceyw08hTaFo8OltZmELpmOqBMhxXVR1Cxp2Asl2fEOGRIPPfBoCtWxC7oksPCOJiwea1NMsGnwOchXxKRYNPkcaXRZB4ZBGq0PqhYPN+IZAIRnTrFFVuaOyFLYQYl+L4yj9uzXD49EZMOkEpamZWKmkdJ1sLKZV2uzM0XMQPBZVM4UiMJhUzAMtpDZiGjbIMulf42EhxKHA/1c0pPWHYZ5pPF3ZomjYsPhsB7ls3r/YHZMC3U4pfPDcePEwm0AWUkiPa/7YtfHiYVYLCKVBxs1oqI4XD4eyFCmU7Q41Dr/hUNwGLDQ+v1GMiQyPNSo/HnpsDpecrhbHRiNbEA0/IyLQcyR04zISMkOGG2ZJhseLh61ZHxT6K4TF7ylRZnattbcBmCxNc20RXfG7uVKHy21zT6CzsMmGgT77/LCGy9pqK15AVouqQZP6SzmVoZ0sTW8qTB5L48XDoRS8Qj33dqxRWV+tEy6JxiGFUuOtiCyOS1MzvpjZRYFUzbqzrtMh6N/paHpT9Scc+v9Gy9RmQ1C0/3P5d+Xi2GicgFkTz4igCVS5PLjhXg3W+toYNo1v0LVWeicNlxOPLOLbwUw4VAKCLdL5WShpfXG9aBQOKrtXwWlRNRgwZLSLZBRIbarsaA+NFw93dD1QSpTOwj1aJqdO0Is0q1mJ7zPdIItabKvu3PfFWfzjQuZ63WbzDWrAo/U8SEDMGlh4tS5oraBAwYOaP7ZK76RWVyQJiFkDlhFtDRYZCAff4qql4RfNewuGBPIr5Bgbe1WkKc7B1FjSdI4d7zftbnT6cKVPtM+GWVc+4KSQhzX6YI2Puzg2uqn4PVXLoqHPgGiQTXd6TIg0+ZlkHT2q+aN7Nb8r2yDRo1s0rNE7qT1+id7zHsUig80YZF4/KAxVegblcx65Q2UraN4rGHi+hd/3KZXCQXP9hkbSIhyqIc2qunYLVdqtW++CR5NXQZN4sNX0TOVdtF2xUqeYqpJVz3jAIX3HVZoD+w6aqjJLIl63cJXutz6Tra3l+x4Q8Dox2aDONEsk1ozNh/R8677mdbF2mXCghUTlJeKyqJocR2+raloJoHKeYawNPZrcPb7/19ouuBF6tnWJBxtR9E5UnSQ3li6Tv/+cWHMF0nPRozkzx9SCNqJ5QzRsM6CdBLxOodZl6V3UyQZtoAZMijUfuuY6xUP9XW/WVltlcudSz8G0gElcIFmq36DjpbQWNNYJjeLBlVbrRtHsxkrsOaEdX0GjeOimRV4bJOJ1uYN8q471GhSaBbwgC48rqdK+lcHqBoru8yFdnyfnPt3CQTCxOqReOGgYQ9tdnSZrAxvR4ENj0bHoO1VD3xC6slYSf04MiIdtRXMU0RV/YN2q04gB8cCyqmQDh8jKkIglkeJXdMWZzKZOOBiOb/BxXThshDCT6VhcJziJBh+aNFVfot4sV5Sk90yXeBpiYpHa1LygabHGUMyErsyggZRZ/yR5xoGSVXIJcRA3Qzqudy6X69omHFIQ52Dj+7sZxDkYjW/QIBwqTF6WVuh4iUy6K7iLEh21JgTtxFikN4vLxYMOBjXNE7rcQcNJxhk1QmuNLvHJca7xrTsseprQs618vV/0ohc1jXEQnczYHUg6zsGWcElMIJmOb6DPV7XasDbl00ukOtmYfAbYRovT+63j/i5xFJe0oOnyCSst+mRt0JGPf5TLAhaExjSn4aO4xR2xc9OKS9d7Q+Uznve857UUDi67K1IvHCzUb1B9ARc5uiiaMKtodeDcMdUkOmIbqoYtNkqQoNHRE0DV6qDD2lCxkd4aF8rs0BFbwukcWbiEWqAs1lMlHCzFN/i4KhzCxDeonhvn/vkXIauDqpmca0t5k+iwNiQWKBYBLT7huAuaJmtD1c+9Z44OEdltqoZGRFi5hJqgNOdtbW1tNhUOtLComDOSunmxvlf6bGKQZJyDsfgG2kGr5OVvMH9pGlEVDpkKkCRzsKq1YdGFZ4TmQR2ulIGYlikdi+mQAwLNdw/pqHSYtIt0jqNLKAg910oWnlYWB+FoPYfIC6oUDb/5m/vEz/3c86x8nyoW6jeoLoRsAt3CQIF5KrvKrGVWqE7MVZdSWcnEr+QTpvc10q5fUzp0hVPgaQhmNVzr/gQ3dGucOkR3QEm4mxIOIiHzWOSF/Morr3z6xz/+SVxfZhKWFdPxDcb7XzBEZcyZiXEg0apaJXLWhR1wAzp851EXFC3WBg2fYQ16LpK41jpwxSXkoxR/0U44OOX7jZsJ8MQTT3xz757rC2fPnosjHpwQRwHWQsQ3qKp1F4IiG1EZM5fy4zZQXYg2OAfptUJHJHqMUvU6ApSNlzTWjaZrncS8POvY9Y491h07dlzZUjiQ+lPxg9jejcf9vuWGP6PQlUARINP1G1QWwjDChCMqFgdbwbgcUF3MnBMNAazthKmYkepzleVr3W25IFTVkeqVWsjlcjvbWRyE6oRq2deUhHBQ+d7IWOpPoYLLkxVoA03EKs/eBvegsXZY3gmrLnpOWht86FqrZrPYFA4uut+UMCkchGWrQ5zvuthaWiHKm/s5BglzjnGvw6JjgVggGqoTsbOiIYDqrrLjZoqCylWvdRoEvOrzYlM4pOHZjkQqhIPCTrzx/OK4ZlwRDmthVDH5oG+m1KijVEFvX8NxtOGQbWIz3y0y5ahOxGkw5epYIDpdx4KiZafisrUhgOrzYsuN7Kp7Vomd7X5ZLjSTpek1hUhq7lUcG4XDcoxzrT+glqqEmY5vqEOWg3bWAxczJ9qRxSJOodHgplhMgymX5sNFxTTJgQ6LIiw7VGtAce0RdC1Nz8suBoMr08niIByJc9ApHGx+f2gciG9wEo19F9KM0RbujqF6LvkONW5UhUOarrUL7orMWRtESOHgQlqmUnxDAM5xDlmsr2AUmsDLmro8phmVCbiaptgXDQXDRKt3WcPmYCllQXqqz42NQoSZnFc7CgcNpWGNLqoa4xtUUlC5C4dQ8Q1Zgixhy5o6D6YWDf1f0hgwa2ozhc1BAB2lkTNY2dUKYSwOQrFLnOlFVZebotPft8NGII7KdUS2AyEXwsnStDSBPq6hCmIWgJtiO6b6m0A4bMflTs2ppFarPRtWOHCOc+AgHFTG0RHq+Ib4BgXkNQwIBtUeAFkCi1kDGlwvraxcKte6mes1DaAJHTM8z7MiHIThIBVd8Q0+HOMclD7bsW6V2iDrwshkaVqaPE9BMMRCZeJNs4tsSeWXGy2UtLlS2RykMrpfw9wF4WCAUMKBa5yDzvgGH4U4h/4YvxMWleun4mZyjoBYWCXrwrGMlYXWjYo7J82CVfXcGoP2VBe4NF9rlTmsO6FOzammbR2HBioKgWSmduO63RQ+q3EmTGkON7S7VwngS721gQTkAB2IW9AEuchUSHOOe5lEaVwKDe+mqnBIc1rgquIc2Ad3rV6iCIeyws0zVSQprguk00O0HNOs3TgZKKNh8k7dCxMoy1ugP5FOaQYsZi2gAkUqH6Hb4pB24aBCljrYGqdWq3lRhIMOd4Vu4RBHyIQJIuIU54D4hksCqgCrglVUTbwDad3pSXeY4kc0CgXVxU37poURqtcGwkEjW1tbudDCQS62k6XpqsLurqCzXr3CTrzjy0W7iY0YvnETNQFUhINSAFeSULBYIWBZgFXBPqpC+OBkafqgiyeeAKpi+MhkaXrIkuVhl0XxrrLm+EA4aCaKxUHQohs3CFD3btyYcAj8u8juCgNxDpmJb6BYhSG6t7AqJA+CysxhItq/O4WBwDo2DBAOmrEpHHTHOcQVDmG/P/E4hyzEN1ADJd+qgOwHXkC8mePigqjhPQfAKnGEgwo64xxi7cQjWAM4xDmksiAMTZRDCGwEAFgAZeU1E7YAVB1aiFQavGhZVBUUeuh8YKqTvhHjO3Q+pFbaaNuA6itMNBRjgmhgCnbB5rFQph4AI0QSDoTKgqRrMjId3xD339fROOk6H99ApZ7LVIzpCNwRAFzEjyGBSANOEUc4qNQO79K0qLIWDjomAtfjG2SEd8C6YLKqpg5UO/ABAEBmsG1xEJrUten4Bp+4MQI6enM4Gd8QEAzzjK0L0t22KIS4WQjxUiGEak4+AHGApcEScL3pJWpwpEqNAx+lG0hR+HGIXO9coXZFr6xuqNjgx6n4Brovs4zFwgZZy8qNAlKxAmBawUQLAGhKZOFAxE1VFBqCB225KYK/F8fUXlB066hcJ9VWtKGhQk0LTCOX12hsZQp2BYATqC8AnCQJ4aBaJCn1wkHBquJjxeIgsyQo4JELVTp337KQ1pbOIB1AOAAnUREOKsQqkkTNjWIVpVEQKkkESKr87obp3TVZGcpMCgRt+GJhvHjYmqUFAACySpzgSJUaBz5xF0bj9RsaUahd0avQB55tfANZQ2K1HdeIdEHMCSGuGi8e7hkvHh6CaAAOglbPdqimpdkfF+JaHATtOOM2sInrD7ftpgj+vhV3hYpVhTD2giTsmkC8gl2WNdxrf3MRDJiNLeJTxvJ48fBESs9tg1mbb23NFcEFVITDsoJwiBvnkHrhoCGa3YhwmCxNL6jEtcQEYsFdDo0XD2PCDodq6jSuNbCKqnBQIVKv/oTiG3xsxjmwim+g6162mDVRJbGwwLXXBugMFrJIKAXx4loD28SKcRAXHtZNxYp7URdI6/ENPpbjHLjFNyxbEg3yWRoeLx6W9S9GIBrcBgV37KEQSwVALGILB0JloYq6qCblpvCJu5CFHreG+AatAYLknjAdBCmF3b7x4mHZcn3B8HeBkCCYzCqqVkI0ywJWSVI4iIhiIG5tA10ToA13BZv4hsnS9KzhmAZfMKjU9AB8gcUhJIjfAa7hhHCgugGxShlrXJTifk4UwaMy2a7pKnhEKZexA187sAbB4AwqKdcobhSNJNLbAYiFknCwGOcQ98XQ1vVQYZHrJuETBpWKkVoWYXKXmHAZVCn6uw+CwRlUdsIQDtFQudaIcQBWUbU4CEW/etg4h6TjG3ziBlp2HL+KVYXQda4LMZp6dWJJLiSI/nYOlQBV+N2joSIccK2BVXQIBxvuCi7CwWScQ+LxDRQJH6deRSuqlCkxgL4RTqKymHVFsLQBCAfgEMrCQYPZue2CqbgTz4pw0BXfoNNFId1EBWRKOI1qSiwWtPCozFUQacAqOiwOQrFWQqcFM3Z8g+5druE4h0TrN0yWpocUXSVBlkg0oBaD20A42APXGjiDLuGgWs+h3aLKxU3hoz3OQUN8g476DUMaPkOyCNdEOqB7iGh/C9C1jlNkzgfCAViDg3AQHSYYbsLBhLtCaYJVdReRcNFRHVK6J0Y0fA7gg8pO2FaZ8rSg8h5DpAFraBEOpuIcmMU3+JioIKny0uvoNqiSBupTJfeEi5YG7NZaoypKsaCFByINOIEui4MwFOfAJr4hgIk4h6T7U+hwU4w47J5AHnxrdDSzAxauNRVuA8A4OoWDip+91aKadJnpbSgWvdp2PpOl6b4k6zdo6I8hqCsnsidSiEKDNx9YHEKiwXIL4QCsoNJWuxEd7orGxYdbfEPw8+MstvJ8GosgJRrfoMlMP6HhMwBfygp9S+rBz1ntx0AbIn9TtB7iOlQU3A6pFQ60wZKbnFUEXiePNuEgdyaTpemqQtXBy4QDPShxP8uGcIjTy6GZSEg6vkHHjlBrV07AjmXFhmcDTQSzs9DcFKtz7GRp+uh48XA7oa3Sxl7Wc5AZTal5HydL0/JaHWn4u7C/fhVSwvWzc+fOK3S6KoTmqGCO8Q0+cc+ziyadIEnHN6hSwQ4g9aguRKnJtCELQlyLowhh4YO7gqDaMkdC/ePmIHbJDFuchENjnANXN4VqnMPF81K0qghNO302rbwTBFX32qChmV13irIrRhTf2bbvC7keVWJKBkP2/3EBpHYzhZNwEA2LGFvhoPg9Os5RUoUZThsIKuuMavCrrgJjSaN6HmHEvuoc5vyCS5tIpaBtdOE1h1bhoCECuz6BM49v8NFRz8F1N4Vw3eJAO2Hd3UDTiKp1a9D1fgpkOld5VtZCBokqu4ZSYHVQFWgqFjLQAd0WB6H40Bca/oyKjfgGHx1xDmkQDq6Tlp1wEO3FgGjBW1L8GNezb1THH9Zqoyoculy2OpDoUR0/5keDmBAOql3e+hRSBK09LDSRxq3jP6IhvoHLi+HszobugUq2QNbIrNVBUxO4UNePNj+qIs1lq4NqHImAcDALN+EgSNWzK/yk+fsGFXcvOuMbVPPrXS7XnJoUQUuUFV2RwuFrrmptWIpYy0I1psRJq4Mma0M1TSmpHNEuHBR34pJ+BbVpO1hQRaj0J/S9jagKByd3NZOl6RHU948G7YRVJ+R+10ojUy0BVWtDJCFAC5+qSDvSJP2bOwsarA0QDYYxYXEQCZmJNhKoTpeUOYyTcHDO4kCTKapdxkPHdZt1xYxOrhXVHfBGzB2wDuuMM6XgSVCqbKh8UP7eMGkSDta/U4N1JS46FbWqcMi75EulserY1WQSeuZVK5Z2OzS563hW4goAHdeolywmrAm8l6psIA3TPBAO7n2vVsuKppfMpeI+KlX/wAV0LET95C5iCy24qu6satwFkd7zRQ3X54gDBbjKmsQ84pYsYEQ4JLQTT0o4uBRX0QrVnGcnUhonS9Ox+guAyyGxqeP9PsZ1QaNxqZQ79plVTBHXZS0oc413mCxNz2qKN4ot0kA0TFkchOUAlSTiG3xcyeQw+Zn9nNPspBl0sjSt2qgJXE5qFzQaj475q6q6A9ZodZC7+QVubkVKc43TMLAZqiINhMSkcLC5oCbm09JQLTMqJs5VxyTJ0kQYaEpkLIOC406uNDVjdCc/Xjy8oKk7q1zQlrlcQ80xMCOaFjJdIq2XrjUL8UCiYV7Tx23ATWEPCAe3vt+IZUVDYx3BMc2OzM2rFtwTJhZp1QXHxr3QtaCxEA+0oOqKgVkjcaUMvfNHdXwWF/GgWTRIJmBtsIcx4aCho14UsiIcTLp/dHz2AoedI7km5O7jlKXsCRNBfqqxM8aFAwlO1QqHPr54SCRehp7bdY0iU/czMasxbkye43pS7yoFxeoUDRVdIg2Ew6TFQVhaUJOMb/Dh3pEzDDrMfInvHANWBl1+0zB0J7XgtaG7NDVjI2thRKOrTj4/8yT6rEH3blmjyJzTnRJIGzGdz5h1oUaCXm5Qjmn82GpK+82wJg3CIfGcXYvtrY2dK52DTp+11Wh5+X0UAHlKQ5W/OMx2ChCVrhzLQaQTpakZoyKORLvuOgEHJ0vTq6YFaGAhm9coGjZMFRcjMaIjUNLHF2pl089lQNDrKPAUZITBxjFzQDjoQ8ei2w4bnT91mfvkhHRK7hxN+1IbBEOSJaS7KENg2wRMgkGO8V7Lu6O6iLMgHmYNPP/SnP6YTKHVvaiRYJgg14TuhWzA8Hs6YiDVXV4DKdQmdL+v8t6RODMh6Bc1uSiSKOLnNDtNDl6+QJOl6TXDwWlchIPRyH0b5ylfQk11+X2ku2CITM/aUqVoIRmgSVTXWBcpyFHl8+Rz/vhkaXqJdlc9TT4z7CKuaxfli4eJ4tioSRfAAI1Zd0zJIHXVXKRnKLZ1L1A+eshQ7Msh09ZHmlMHNLtWBH3WEeqqKZ+TBZWdPFkYhgymQK9pjCNZT8hK6Sw5z/OMjp0eQlP+ZhnfwKJ+AL0opwx+xc02Or4ZPo9FmvDKUUUEjatAC5RuISp3LkO0M9K9A21EBnKFcuOUpmY2NS8OfspauTg2qt28a+EdEHQOZXqOlts9R7R77jP43ASpP0MGP/8yDGQlNGPNv9adYjboWgffUZMLsYxr6NG4EVHZ9O1zscS1yrv6XNcOawAAD69JREFU4he/eNOoxYEoGxQObG6YfHgmS9Mmv8LKudJ5LBlaQAfpmCdL1Hoge2CT/ju4qPbRrt3WhG/CB9tIFLfBqmYrVjcFph0rTc1U6fP9697XpNPpbHFsNLRYpWdn2PCC1k3zSX1OoXeumZukz2I/Ep2731CQdbBHU3XLVvTScYSu80YLS5jNay2f2wKj1MtMxlcYFw6GF1RuSq9iyF1hI74hyAgt4CYnA39SMr1Qt6Nxl2gjyDXKNS0bdH91BT671T1oJibaQgtawXKVziRjW9aSWsjGi4cnSDzYutbdCZv0fdFgu8x/S7IamGk6ONLHVOAgN+FgajxWz5NehrSnOA03MS2zmZAIm2Xbm9FVmpqJHCxH11Vn9D9XEhMNPhm61uxEQ5axJRxMLHwc6jc0kgrhIC5MSHLRmrP9vRaokmjYFo1Nz5PN8uFtoTgE09k6ncYQa1HMwIKWuGjwydC1hmhggsvCgWNAiqkHO5FzHS8eHknZhLRBE1C7FC5uz5WRmgA2SPGCxkY0+NC1PsRjNFqpQDTww4pw0NQLoRF2wsFQmW3b8Q2XkaLJXwZ89oWYgJJ2D1xGcWx0OWmrgwopXNAWuYkGH6qncTMnq5kiR2UGEnpQ8MOWxUEYWOi5psCk7jwdFw9VSmUNW5iHlXAghlxeDGhB25eCBU3WaRjivJCRi7FgsU+QCTYozdGWtS3J4FonsSkcdE7IHOMbfHQv9CxMdCQedHXos8Ui5XtHSSnc5CaSKNbB6WBVsjr2OGo9kYvwVSSA2ENWtYKjMUpzZBl0rjZClnBVOHDcFfqk1rJCOwAXdo5y4X+Fwu6QXVwB1VMYZjCU2Mh7QcWvhh2xPlTJXB7GxcUKutYj9L66YH2okDgbgWuCP9aEg+adHNsWqprjHKrcLCuBnSPH3UxQMMS+bvS7pqwrsXfcxbHRBcuLrpHvoeDUHuYWrEXa+TobnCrofZXCh+JMOIq1CrklkgyATEtMiDVsWhyEpha8iw6of12TDUvTaGA38woGpucqiRhlwRCEFgx2ZnUSD7Z82MbeM3qGJugZOspo8tYiPrlBbpYeRtd6KSAYkraqxn3OXW6OpfRuG+9V0QjVNJ+N0VBogxqvOLEDoGZRIwrVFysWOu1pgarXTVCNelulZ5eo54Ux6xM9qwuaq1tq62lQmpoZoetu6pofMtwY6yJ0rf3GZSZLjDfD7+GxkBUzOfW6GLIcGOj3GZnlJMqoadhCjPeoaT0YV4jbR+rFL37xE9aFQzOoRG0rVl1+mQPnttnOUtJwDdZd3O0EJv8BA6Wkq36DrDhNslSYLE3rWKA3aHLS1iVUXBAPphbcxeLYaCIBmYHupwWDJcnXAs9SZmsEBK71gKly+fTeLnC+zoGGaD7b5uA0zNGN0P2/2CgyrPWHhXAA6STQ0bKPjigWpjUyp61Sd77EJx3apQ2E7ONR8cfeqYujLkpTM8EFN0qvEb95kd90zEj3zLhMlqb9Dpc9gcZnUZ6lSqCZ17LrmxFTNHQTjdNgLti4Dtc5xUA4AKs0KtwmODHZNNmh+LAaf2lqpqU1j4pLOQ2Jimb9NLBoaaSdVRipk9kDwgEAAAAAobGdVQEAAAAAh4FwAAAAAEBoIBwAAAAAEBoIBwAAAACEBsIBAAAAAKGBcAAAAABAaCAcAAAAABAaCAcAAAAAhAbCAQAAAAChgXAAAAAAQGggHAAAAAAQGggHAAAAAIQGwgEAAAAAoYFwAAAAAEBoIBwAAAAAEBoIBwAAAACEBsIBAAAAAKGBcAAAAABAaCAcAAAAABAaCAcAAAAAhAbCAQAAAACh2YlLBQDgTGlqpkcIMSuE6KdhbgghJopjowu4cQDYBxYHAAB3JgKiQdJNQgIAkAAQDgAA7vQ0GV8X7hoAyQDhAAAAAIDQQDgAAAAAIDQQDgAAAAAIDYQDAAAAAEID4QAAAACA0EA4AAAAACA0EA4AAAAACA2EAwAAAABCg5LTQBtUGlgehRCfuSmEWC2OjS7jDvCmNDWzSwjRR/e2sRiTvH+bxbHR1RSdp896cWx0PdlRqUHvZF/DefnIv9tF/+2/h/K9LLt+3lkkMP8Kuo/C1HuZ8zwv69cbKEAP64gQYoBKAUelKoVGGhaeNEGL6ADd294Qp1alxadMC8+mrstRmpqRn5tv/Pvi2GhO43f00fibVaSUvTH8hXSV/put6KV7J+/bUMx3UjJXHBsd0Tw0YAi65+ttKqoGn+Fl+u/luAIRwgHEgh5U2UPgoIYruFYcG222IwIJUJqamaCFJ25Z5yoJiAkdO1dLwkE2zBqM+Gv+eS5wERGlqZkRei91lOS+CoLeDUpTM9LKeyrGYNdk35eoDeMQ4wAiQ6JhWZNokPTSZ4IEkdaj0tSMXCiOKC48XbQIPy5FiCP3tlk/jE7453lKihuavBODxM8xjX08BpI8H2AFaU2cL03NrJemZkLfbwgHEImAaAhjvo4CLA4JQqb6VQP3VYqQVfr8NJMnATGRxDmWpmZmY1hMAPCRLq17pfgMI/QhHEBUygYWF5AgFKfSyr+vAzkpPVaamhlifJ91BQMeoZ2/NcjSocv6B9xE1/MrxedyJ/EA4QBCQxPUNl9zC2QwTiVwrOFKs6VsqU31PGPxIGMDFum5VWXQsngI+12N72SF4jSA41As0bCm57eX5oSWIB0TRKGTGbZCk1jTqPoOketxfMxAETKtt7Mg+QGA65RmG1Y4tqLuT+WWkUDP62WiJpDe5qc0FiJY26R4WI4adBYV8ku3y5zo9E7uIhdV3OwLwAR61hbE9tTiXYGU3ELITUJezg3FsdGmcz6yKkAoaBJ9vM2/HQ4zSZamZuQi1N/kR0dbPaTADCFSuKSVaCCYGUEWg/k2A6qEEBdSjPSETdm0kVURFnoP/DTVTottpPOMOZ5W75PkUHFsdDbEZ0xQLEojeCdTCInNkZCbgKaZNXBVgLC0i7gNJRoIpHfxoV3K5RrV17jMd0r3ebHVGRTHRuWO5uYOJnD5nR0XNI7I6yEX4+LYqBQQRzsM0cZ5thINR8OIBpA9imOjZXpP94VwbTR9hiAcQFhaRcVXIppjE01ZA5fRqsCPX5Sr1U657S5UTkxk3m8X1zJIu3dnod34VR1E0qCpdNQ26Z8bsBSATpC7sK/De5pvlhEF4QDC0mqSx67GQWjRaWVtGGlnXicrRNudCv1+ocOk5HxlQjLjdhLDpgJCW31v28C2JqC8dEYJvKft3udt7ymEAwhLq10Tek24SatFpxrSgtRxsQlMSq125JzTM0ND4qGd28LUebayAkI4gNDQe9rOFb3tZxAOICxNo8ljBH4ZCxQDkVDdrTZbtLZZFzpMSl1JV1vUBbkGWu3aTFVGNV2RE0XZMgKJ31axS9veUwgHoEKcnGEER/Kmo3Cg2IRmbo6mopB8qa0mpTSVNW7ntrMmkKKmurb59ygDny3axcVAOABtYGJxl1apWGEsQnEWwVaTUpqCZdu5eEzs3pvewwyU9wYGoNilVjFJEA5AGzaqDQJ+tBIBLa1JNClVmvwoNeXLyS3T7ByFZYEEQQ/i0kr8XiZGIRyAbRDj4DDUtrlV4aNOGTZN3SBpiXMg0mT2hwDJHq2e365gnA6EA1AixqSPGAfetIw5IBN4K2tDpbFYVBNa3fs0mdZbTbwmLCutrBu6QLv7jNGsSmSAi+8phANQJerE0qoeBHpV8GCo2WJBf7fQxj2l0pMhTfe+5cRLpX5dI03Bq0ATEA5AlagTS6vd5QB2N3Ygd0MrtpVJJqvSeoddc5jFv1U9g1gWB6adNtudi62CV5GEWIdgytmUuZJAGzqI24vvG5pcgVCUpmbaPSj7GlO6GrqziUB3tsE2n1OlnetqQ1GaHlgklFkPXMd298CnQmb3sP9eMtcQxxBccOTzcLDF721Q74emtGpyFXheuMTN7KLJtV3Q8GJxbFSL4GnT4KpKLqXlVqbnwPs5EGLMgqLtG99L4B7t5tKeEI3bZFr1OoQDCEUH4eATpjMiANto1+myjXBwlQo1GVKiTVfLRtYaxFWYBQKAlsBVAXQC0QBikTE3Vd5yg69eejf9A6IBKAHhAMKyhCsFDJK1okU63CvIUAKJAOEAwoIumMAk7RbStC2QGzF6vDQD8QYgESAcQCgo+HEYVwsYYKND/rhKqidHtHSUpWs2l7JrAxwAwZEgEuSbHaCIeT8yG6Wn1ahm2Owsd80TnYpHUUrgCNNqhlGCDeW9HojaiKodgQyJQiBqHvFG2cX4fALhAKxAgmO5zQQrYyhGQlQfBACEpKEGg//fqwHX0EQbkbFGoi5sq3WQESAcgDVKUzPrLYTDUnFsFBXqALBMaWpmoUWdjrXi2Ci6bIKmIMYBWIF2Pq2sDbYq6gEACHJxtCruhXcStATCAdiiVYDbGtwTACRCq0ypDZ0xGCB9QDgA43RoxZy2iHkA2EP9KVpZGyAaQFsgHIBRaII61uY7EHgFrHDnR48V5BHnu+786LGeOz96LBXVLQOdTluBdxK0BcGRwBg0Qa23SdfUUrMfgHbc+dFjfbQY+lavDZlhcPsHDrV1kd350WNDZM4PPr833/6BQ04vrG0CIiXV4tgoutSmjI8dm+uhZ9lviiZTNkfef+hgLIvvzqxfUGAGsjQsdKjxMIHLDyww2+Aq66a/a5nJQ2JjvsmPRlzdkZOQn+3Q7RSuw3TSmArfRc93rPsNVwXQDsU0LFNznVZUEIAFTCNdDC3qFPR3cD2katdNWU2rIdraQ8ynjI8dm2uX0RYLWByAFgIVJdsFQgZBuhewQbsulH0xAgGdqchI7+QQvZftRLzPhKYeGiDlQDgAZUpTM9L8eTDC5wx36E0AgC7aLYRxflZ14c6Q1a9dUHIj0gKIRnbppFUsT+xnGa4KoASZQKOIhsXi2Cj8qMAKt3/g0CqVTm5kkX7WFPpZpcnPXHl2o4iGtXbxHsBt3n/ooBQOi01OIrarGMIB2GSuODY6hCsOLCPF7SESArInyvDtHzgU5jkcaPJ7aXOxyXMrwEWRbt5/6KB83m+mbqoVEhKx41mQjgmUID/q4x0+Q5rEhtAsBwA7lKZmNjtkNMl3crY4NopgSBAZWByAElQueqPFZ8jJ6agMUINoANyhFMy00MoNU6XdZh9EA4gLgiOBDlYbMimWKNe9DBMo4AxVkhwhd0bXnR89JhfWvk7FoRxgNZABskH+7GW8k0AHEA5AByNUWGYT2RLAFajGw6mG4XZRCqPru/EJEu94J4F2IByAMuSuQIdL4BqpzSQgqwIKrAEjIMYBAJBVYLIHIAYQDgCArAIrGQAxgHAAAGQVWBwAiAGEAwAgkwSqQzYesEQA0AohxP8H+qZ4MWudTFIAAAAASUVORK5CYII="
            alt="Base64 Image"
                                    />
                                </div>
                            </div>
                            <div class="status-message">${statusMessage}</div>
                            <div class="section-main">
                                <div class="section">
                                    <span class="section-label">ID:</span> ${
                                      data.id
                                    }
                                </div>
                                <div class="section">
                                    <span class="section-label">Station Name:</span> ${
                                      data.stationName
                                    }
                                </div>
                                <div class="section">
                                    <span class="section-label">Status:</span> ${
                                      data.status
                                    }
                                </div>
                                <div class="section">
                                    <span class="section-label">Comment:</span> ${
                                      data.comment
                                    }
                                </div>
                            </div>
                            <div class="button-container">
                                <a href="${
                                  data.url
                                }" class="button">Open Website</a>
                            </div>
                            <div class="footer">
                                For more information, contact us at:
                                <div class="footer-info">
                                    <div class="footer-row">
                                        <span class="footer-label align-right">Location:</span>
                                        <span class="align-left">Main Walton Road, Opp. Bab-e- <br> Pakistan, Walton Cantt, Lahore.</span>
                                    </div>
                                    <div class="footer-row">
                                        <span class="footer-label align-right">Email:</span>
                                        <span class="align-left">Energy.Support@wateen.com</span>
                                    </div>
                                    <div class="footer-row">
                                        <span class="footer-label align-right">Call:</span>
                                        <span class="align-left">UAN: 042-111-365-111</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>`;
};

module.exports = { onboardingStatus };
