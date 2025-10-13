// This component is only for the downloadable certificate layout.
export default function Certificate({ results, userName }) {
  const completionDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-[1024px] aspect-[1.414] bg-slate-100 p-4 font-sans text-black">
      <div className="w-full h-full p-2 border-2 border-amber-800 bg-slate-50">
        <div className="w-full h-full flex flex-col items-center justify-center p-8 border-4 border-amber-600">
          {/* --- THIS IS THE CRITICAL CHANGE --- */}
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYQDAoMDAsQCwsNDhgQEBIQEhAXFhIPEBATEhYVFQ4SERISEA8QEhABAwQEBgUGCgYGChAOCw0QEA4QEA4QEA8OEA4PEBAQDxAODxUQEA8PDg4ODxAREA4QDhUQDw8PDxANDw4QDw8NDf/AABEIAEgASAMBEQACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAGBwgFBAkD/8QAPRAAAQMDAwMCBAIGCAcAAAAAAQIDBAUGEQAHEggTISIxCRRBUVLSFSUyYXF1FhcYI4GUsrQkQ0aRlbPw/8QAHAEAAQQDAQAAAAAAAAAAAAAABQEDBAYAAgcI/8QAOxEAAgECBQIDBgQEBAcAAAAAAQIRAwQABRIhMQZBEyJRBxQyYXGBkbHB0RWh4fAjM0KSFjZDRFJicv/aAAwDAQACEQMRAD8AhW6Lorpuuv8A6/rCQmpy0pSipPpSAH1gAALwMDTZOHQMZpueuAZNw1oD+aSPz6ycLpGM2TuBWmyUs1+tOH8RqkjH+vW4Bw2SO2Hr05dOe5HUPbtWuQXvWbZt6GrtMTHHX3zMUD6g2C+kYT7FfLGcp9wdQbq8WhtEnBG0sWuNyYH0nGxvB0jXPtlbL9fpW6dVuupsgKXBEd+I6EkZ8KMhR+hx4IOMZB949HMVqOFKx85/piZWyipTQsGmO0fj3OJkRftzeFf0lrKwfvUn/wA+jMYr0474t/1pwhLtfrTZ/EKpIx/r1oQe2HAQecaIueuEZFw1oj+aSPz60nDmkY0rXuiupuugfr+sKCqnESpK6k+pJBfQCCCvByNYDhCMZtznF13D/NZn+4c1hwo4wX7A9NV9dV13T7esgU5lNOZRImzKpL7LTIUopSSACtWSD4Sk/vxka3XbDbGdseg9i/Cb2w20tqZUr+rc++61FbMlTLAMSGjtkrKQ0lRUrkPB5rOfcBPtpKmrQSvMYWlp1qG4kYT3Up1Y2U1Qodq2pV00y24DKEMUS3EcFq4+EJJThDYHjPI5x4CT50Ao0KlRtRX/AHfmR3OLgbq2tBE6m/8AX9+AMJza3qcgVxyiWVPbateIZxbhV2pOuzG4iFj9l1I9RysAp90pJ/CManGx82tjP2jA5s4JXSiR6fT9/wCzieL3t9xjdG5qFS1Sq441WZsaMtEc9+UEPLAV2kJ8EgZKQnA+wGiYO04rpknHNX7Bum1IiZVbtmsUiKQCH50B1pvz4GVFOB/A+dKGB4OMKkcjHzphLUNC+YcbPn0nIT/99dasO+FVo2wRWwc3Xb381h/7hvWgw63GOS9nuN019A91VWZn/MOaXGs7YdfQZ1PU/pe3pnVSvrkN2vWaYuBOXGY7q2VJUHGV8QORwQUkJ/Fkg8RhxYwy09sOnfj4rlXr8abTNsaMukpecUlVarbKHXSOJTltnPEH2I7gUMZCkZOnC/pjQJ64getVidcdZnVapSFS6jOeVIkPqSlJcUo5JwkAD+AAGtMbxh1bQ7qbNxrUiW1ultQmspiqJauGgyFRprnJX/P4qSVAA/iVnA9Ocai1EedSN9u2JtKrT0hKi/fvipaL1V9PeylqSqrt/CCq3VFqW+20xIfqryickyZEklWM+w58cnIzknQypSuap0nb8sEUqWtIahv+eBy0/igMPVP5O7LGW9QislMhiSH305PutCkge3k4UfsM6z+Huo2eT+H88Ib+mx3SB9ZwX33fPR9uzbMq4Km5SafPeUoFUaK/DqgXwwMoZAcXj7q5IP1Jx4xfekbSJ+8EfjhGFq66if3/AAxAlhPrcuK3EO+HBU4Wf8w3ox3wJnbD56Tttba3b6uapbl3Upus0Vaqu8qI6tSUlSHVFJykg+M/fXOPaFm13lWS1LqyfRUDIAwAOxmeQRiZZ01qVQrDbfFBdUG2XS7tZtnXZ1Ap1rybrpNQhIcpESsF6WoInsolt9rvZCu3zSoEAp9WcEeORdHZv1jmd/SS6eqKFRHIdqYVN6TGk2rRxq0kHg7cg4I3NO2poSsSCO/z3wdv9D2yKrmjbjClQm9sG7XXNdgCWsxFKyHUv9znnAazn1cccT4x5rq+0PqAUGyrxG99NwEDaRr0/CU06Y+OI2nkb9nfcqM+JHk0z/X8MBG0O0/TfVOmiHuvfFlwqVSJ1Smth5bkjLCDPeZjJUEOHBCQkEj6+c6sGfZ11VSz45LltyWqLTpmITdhSVnIle5kgem2GaNK3NHxai7En89sE1sdBu1FK6h59Odoyq1Z9UtoVSn02dJdWIS0yENr4L5BaklKgRzJIyfPtgTee0fOauSLWWoEuKdfwnZVUa1KkiRBUEEGdMAwNvVxLKkKsRKxOF5c9ldLt4XtttbdiUFhNVn3U1HqcJxEtlbjAjSS4CHFe3PhnHn2+mrPZ3/WFnaXt1mdU6EoFqbDwyBU1pBED/x1c7c4YZLZmVaY7788QcN+5+jXprvWZdFjUCBGo18UmKl95FKnPCXB5oSttRQtRQpJBGQQoYP0OCKLZdedW2aW+Y3TF7aq2ka0XQ8EqQCAGBBBggjcdxtiY9pbNqRfiHpju2n6O+ny77AosxVp0Wq1FEFg1FcapOOltfAc+fF30nOcg4+umc/666osr+rSFeoiF28MGmolZ8umU3ERxhaFpbugMCe+Il6qtuba2o6uKdb1o0xqkURDtIeRFZcUtIK3UlRBUSfOPvr0h7P80u80yWnc3zlqpZwSQAYEQIAHH0wEvKa06pVONsEnw++7/bVld/He7NZ549s8/Og/tW/5dqf/AGn64dy//PH3wxfiDO7DU6zK+za4tz+tF24Uu1FcFIXNSouLMruKHseR9Q+/jVJ9mI6lqXNJr3xfchRhNWyRC+HpHfy8H0xJv/ACnRGqd/X54flo7MXPXfh8RNuJVWfjXXNthfa9QQtvktTzLC8g+gJKWVn348sYOMc2vs+tKHWrZqtMGgtcA9wSAEaoOPNM1FHrE4nJRY2vhzvH9j9MBfTxuNb+zHw9bfuO97ek1emU6oS2pFLEZtx1K1VR5CctukJylR85OR/HR/qjKrrOOtKtrl9YI700IeSBpFFSd1BMEcRscNW9RaVqGcTudvvjQ6UuppXU31OXXVGaQuh0Wl2wiJAivOBbxBlpUpS+PpBP4RkAAeTqP1n0kvTfT9Ci1TXUeuWdgIE6IAE7kAdzz6DGWtwa9YkCIG2PnuZVN3rq3b2blXtYFNt+jUe6Miq02rfNJcLrK0IBbUkEZx7gn7adyijklvluZU8uvHq1KlD4HTTAVgSQZIPPoMa1PFNRC6gAHscOyTMsh3dHcaLaMKmNbyM0Ztc1+XGcbLyVNJ+X5ugetA4pB4EkYAOPGudUkzEZdYvfO5y41SFCsDpIY64WfK27ETzJIxPJp63CDzxiRfhzNSFbL79RpyVGaQ8mSHfKir5VwLz/AI513D2ouq5vlD0/hDKRHp4ikR9sCLHelUB/vbEE2WhaK9b3yyUpeM+IUfvPdRjXphuTgIMVh0GLSz1u1FbighHCtkqUcAf3p+uuQe1QFunqgA310/1wTy//ADh9DinN+Kj012sxdMFNGoteviuS+7Ni0GnJqdUeW68HHfPkNlYJ/aWgecA+dcY6VodXXdS3YvUS2pppQ1GNOkAqFUgcvBA4UnbBv3ZK2paKFm76RMSe54A+ZIGMD+uLercbfuh1rb2x3KLRZVuSYdMo92Phkyu25zde4tkjKOKQlHL7+r1eLzlvs5tP4Z7heuXrPV8YvTECFEaFLQY3MmOSNtsGzk10oa5rPTpU0Ko2ptTKXO0qgbcgTyONyMDFS2Y3V3Z2NbfuC/rcoe3VVnuVCo0amQ/lnYvOpFMh11DjRIDTpKlpS+CfPucDV8y3ILOzrJmdGmPEVRTD1HdnVFHh8Qq7KN9uBtgtUyDL6dw+W1qtd6omPDSmtN2KeIqq2p2lxAVtPJ3GB9vpgq/T3vFRrW2z3NnS7ouGOy0uXTWhGSgOK5oS6HAsFPEcyoJ8AHwT4JPOralmLJZ3dKnWWZAYEBSe+xnj54mZT03ltbL62Y1RWopTkEl1csF5jyKJ1QsepG4EkHW4be9lBjvynd0bd3Ct+2HqdcP6RditAOlb6mGkJDCUnJWFZCgfA5BR8pTU26Nye18WpRoBdVMoTSdo01DHwtq3keoED640o9PW994NOlUrU6ru6hKyKwHhrrJLDRC6SN4JkwRwSKWzvhc9i9Q8zei/bJkN29c9ufopg244l/udp1odxAfUgkDiQQPOSOORoDmfRtOt0/RyezrQUrGsrVgVDDzArKh+7CDHbAur0pmVK6qeGq1ikK60mllJ3GoMFO4Hafnxjp6DLsoTcPfqC9UmIT9XkyZsGJOUGH321od4qDavP1wf3+NC/aPY3DNlNVULCnoV2XzKGBWRI27Yp1Cm9BqlKspVudLAq0fQwcQTYIzddrfuqML/ANzevTj/ABHFd7YP6BAplQ3TrzFRckMl6fObZVHkLY5EyHMpUpBBwofTP8dBc0aotHVTAMEEyA30IBkbHF56Ps8vvL8W+YAkMDohioLjeCQQdxxv2OPQjpTtizhtiw3QaBCo970WtGa3VkUJbnc7REkNiWgcG+bKFIKXCASoKAKuORNlUFenqaTUDTqIJO28auB5dt/tjpXUlB8uuzSpwtpUpafCR1QDUNGo09i5FUh5AJ23IEw7b43AsO0qnQ50uqswnKMuprMSCouzB80iRzS0EBSkhS1tqR4wlJQThKTgxAd18MElSdlBJ8wO20xJII+UYo9rbXb0aocALUFLzVCEp/4ZSGYsVXZVdTvJIYCSd03e/UdatdsK47QptArD1JuJyY+1CAZbMNchtlxJyFnPGRzJAGFBRwCcaKfwDM7ik6pauFMnzFEiQD/qYHZpPGINPqfI8uv6FzXzSi1WloE0hVr6wjMseSmwGqlpAlgZHbeBisXLc9J6g6FejtmT2pNAahwZlJKVLcUW4xbcHJKeIUUuZSM/hz76i/8ADOZNVS7RaZEDbxVBIEgxMD15PbBwdd9OU8suMmevV1MznWLeqVUsyuoMAnsJ2mDsPXrFy7RXDZNfs+RT6/tjBcq8R5KozPzTz4jslv8A4rjyVyK1qUQlJwoJPvnWV+mLxKJV7Z1UkNKFakgDk6S31/DGtl17a1L6nc0cxt7isqOhWvqt9LO0kUxVWkNlAUb92WNsPu2KlZ1/XTZ9etSTFfo1sUiXT0wnw03MoIeIbad7Kz6QhLGPUOSkucwMnGoOlTURgICgiGEFZ2mD2Gn+eG7j3u2trijcE6q9RH1qS1OsUksoddm1GpMgwGSJ7hAdUu09hna6HWqjaTAvGs1hxEiWkrZ+Vc5KceQGeXFKC2UltbfqycqPJWhd2fdqfi05V2O5GwnkgrwRHy+uLjkaNnF01jdlaltTpeUMAzaY0qy1AA4cOTq8w22XYDEC1KhUe3tz6HDo3c7bdShB5K18whXzCPCSfPge+dGsurVa1IPW5PHbb1OOX9WWFhYX7W2XzpUDVJkBz2B52ETPrtjDuVSkXdX1JUULTVpikqScFJEheCNETvscVBCVhlMEGQRyCDsR8wcMe2eqm77CpE2HT0uIbnsJYnuRpq2RKCc/toSnHnPn/t7eNZlltZWbMz0i+o8FyqR6QBvHzMeoxYs+6nzfNqVGn4qUzTA/xFpK9Ut3bUxhNUAwqbGSDvsxnTdcuy7eqltUqmXhUKlGkzFUK25nzC4SGC0lzKkJ4lYU6lJaQCrKhx5+dTLT2nWlnXq2rWYt6dMqgdz4asz6tMDTIUhGIYmIHm045NmfSd1mr+Pe39Wsxk+bzEfi0T8hhcf2jbisS4ob8i1TRaxAkNyWW6gtba0KQoKSS2415wR7EY++rmvWgu6R0U1dGBBKvIg7HcD9cB6XQ9O3qLUW4YMpBEoOR8tWGDT/AIlm6MAICotOmkKdWtcvC1v8222/7xQQOXENgp9vP7fMcQA75nbN/wBtHHDnaCTtseZ3/lG82WllVzT5uS3MzTXeQBvDDiP3wtah1P1i465LmSaE3Oq1QfclPFElRceUtRWs8Ut/UknwMf4aOp1eaNMKKICqABLmABsNyMVmt0PTr1GqVLhizEk+Qcnn/Vh47T2duFuHEclVi2FWlRnG3ENu1NuQ4pxWEqQFtBrKEq9wtYAOBxzyTnmXUftWyxR4LWtO4baRrWAJMkMR5mWPhXcHmIMWbJemr/Kqgq2F/WpRv5RG/wBJI+5H54Uu4vVVe24DohVqQ3UXaSl2BDnCf8y03hXEqa9GFg8QQsnyAn3Gkvra0vmp1kptTEA6CxOxAMEEalPY7mOMdVyHqnMsota1uDTd6n/VFMI4bfzEAlHiZUaFE7mcKu2lKXdtAUpRWtVWhqUpRyVEyEZJOpQ22GKo5JksZJMkncknkk9yTzjRui166m66/wDqCsKCqnLUlSKa+pJBfWQQQjByNKRjUHGb/Riun/p6tf8Ai5H5NZGFkY27JqN97cVJ6bb1NrMYSEluXCepMhyLMSW3Gil5vh6k8XFek+MnPuBgZmGWW+YIEuFmN1I2ZTKtKnsZVd/lHc4VXKGVP7YYdR30vi663S3bnsOZUKcLhFWqbQo70lT7PbjoXGaS+k8G1doqUOWCpeQE8PXV6XSVK2pOtrUZW8Hw0M6YeXIqsVjU41gAxsF3mfK8bgsRqE7yfptt9NsbjNz7UTb2pkqZtbOYjfoeUJMFi1i2EOLQz2h2wopWpK0uqDvADi422AO3z0LOVZ+lu9NLglvESCahJKAtqM6QVUqUGjVMozb6tOHPEolgSvY9u/8Ac7/PHY7vhSLVfKbG2ZuGnxgXnEtuwjAQovFYWVFhtToU02e20tDqchRWpILaQrVek8wuRN/dhjsJAZzCQQBqKpDuNTqyGI0gkMSM94RfgX9P67DjfC53M3Q3M3aZcjVqj1GJTnUtodgU6jSW0Phsgo7yikqcwRnycFXqIKsEWrKum7PLCGoglhJDMZ0ludA2CyNthsNgYwy9dn+LC/Fr1wAAW9WgB9BS5H5NWeMNSMaVr2vXTddA/UFYSE1OIpSl019KQA+gkklGBgawDCEiMf/Z  " // PASTE THE COPIED DATA URI HERE
            alt="Expert Academy Logo"
            className="w-24 h-24 mb-4"
          />
          {/* ------------------------------------ */}

          <h1 className="text-5xl font-serif text-amber-900 font-bold tracking-wider">
            Certificate of Achievement
          </h1>

          <p className="mt-6 text-lg text-gray-700">
            This certificate is proudly presented to
          </p>

          <h2 className="text-6xl font-extrabold text-purple-800 my-4 tracking-wide">
            {userName}
          </h2>

          <p className="text-center text-lg text-gray-700 max-w-2xl">
            for successfully completing the quiz on the chapter <br />
            <span className="font-bold text-xl text-gray-800">
              "{results.chapterTitle}"
            </span>
          </p>

          <div className="mt-8 flex gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-slate-800">
                {results.score}%
              </p>
              <p className="text-sm text-gray-600">SCORE</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-800">
                {results.grade}
              </p>
              <p className="text-sm text-gray-600">GRADE</p>
            </div>
          </div>

          <div className="mt-auto flex justify-between w-full text-gray-600">
            <div>
              <p className="text-lg font-semibold">{completionDate}</p>
              <p className="text-sm">Date of Completion</p>
            </div>
            <div>
              <div className="w-48 border-b-2 border-gray-500 my-4"></div>
              <p className="text-sm">Instructor Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
